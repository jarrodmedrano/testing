import React from 'react'
import dataPropTypes, {verticalPagePropTypes} from '../../../data/dataProps';
import propsAreValid, {navigateEvent} from '../../lib/util';
import StickyBanner from './header/stickynav/StickyBanner';
import Tabs from './header/tabs/Tabs';
import Price from '../generic/price/Price';
import Button from '../generic/button/Button';
import Main from './main/Main';
import _ from 'lodash';
import keydown from 'react-keydown';

const mediaQuerySmall = window.matchMedia('(max-width: 768px)');

class VerticalPage extends React.Component {
    constructor(props) {
        super(props);

        let {groups} = props.data;

        let title = this.props.route.title;

        //Find the title of the group and if it's the same title as the route, that's the current page
        let currentPage = this._getCurrentPage();

        let currentBrandColor = currentPage.brand.color,
            currentPaths = _.map(this.props.routes[0].childRoutes, 'path'),
            currentId,
            currentSections = currentPage.sections,
            currentSectionClass = `${title}-section-`;

        //TODO: get array of paths from routes without mutations
        //tack index path onto the currentPaths array. kind of a hack.
        currentPaths.unshift('/');

        //if current page is homepage, set current id to 0, else find the index of the current title
        if(this.props.location.pathname === '/') {
            currentId = currentPaths.indexOf('/')
        } else {
            currentId = currentPaths.indexOf(title)
        }

        //set Current page in the state
        this.state = {
            currentPage: currentPage,
            currentBrandColor: currentBrandColor,
            currentSections: currentSections,
            currentPaths: currentPaths,
            currentId: currentId,
            currentPath: currentPaths[currentId],
            activeSections: [],
            currentSection: 0,
            currentSectionClass: currentSectionClass,
            currentTitle: title,
            groups: groups,
            legacyLayouts: false
        };

        this._getCurrentPage = this._getCurrentPage.bind(this);
        this._handleMediaMatch = this._handleMediaMatch.bind(this);
    }

    componentWillMount() {
        //If there is an OEM group, find out if there's a compare section
        let findCompareModels = (oemGroup) => {
            _.find(oemGroup.sections, (result) =>  {
                if (result.sectionIdentifier === 'Compare') {
                    return this.setState({compareModels: result})
                }
            })
        };

        //Find out if there's an OEM group
        _.find(this.props.data.groups, (result) => {
            if (result.groupIdentifier === 'oem') {
                this.setState({oemGroup: result},
                    findCompareModels(result)
                );
            }
        });

        //Find out if there is a retailer group
        _.find(this.props.data.groups, (result) =>  {
            if (result.groupIdentifier === 'retailer') {
                return this.setState({retailerGroup: result})
            }
        });

        //Find out if there are legacy layouts in this page (or not)
        _.find(this.state.currentSections, (result) => {
            if(_.includes(result.layout, 'feature', 'featureCta', 'featureCTA', 'ksp', 'centeredBackdropTemplate', 'threeColSpecs')) {
                return this.setState({legacyLayouts: true})
            }
        });
    }

    componentDidMount() {
        mediaQuerySmall.addListener(_.debounce(this._handleMediaMatch, 1000, {trailing: true}));
        this._handleMediaMatch(mediaQuerySmall);
    }

    componentWillUnmount() {
        mediaQuerySmall.removeListener(this._handleMediaMatch);
    }

    //Find out if we are in portrait or landscape and create screenOrientation state
    _handleMediaMatch(mq) {
        if (mq.matches) {
            this.setState({screenOrientation: 'portrait'});
        } else {
            this.setState({screenOrientation: 'landscape'});
        }
    }

    //Keyboard Navigate to next group (Navigation Tabs)
    @keydown('cmd+right', 'ctrl+right')
    _handleNextGroup(e) {
        e.preventDefault();
        let currentId = this.state.currentId,
            paths = this.state.currentPaths,
            nextPath = paths[currentId + 1],
            firstPath = paths[0];
        //if we are not on the last id
        if (currentId < paths.length - 1) {
            this._goNextGroup('forward', nextPath, 'ctrl+right');
        } else {
            this._goNextGroup('first', firstPath, 'ctrl+right');
        }
    }

    //Keyboard navigate to previous group (Navigation Tabs)
    @keydown('cmd+left', 'ctrl+left')
    _handlePrevGroup(e) {
        e.preventDefault();
        let currentId = this.state.currentId,
            paths = this.state.currentPaths,
            lastPath = paths[paths.length - 1],
            nextPath = paths[currentId - 1];

        if (currentId > 0 && currentId < paths.length) {
            this._goNextGroup('back', nextPath, 'ctrl+left');
        } else {
            this._goNextGroup('last', lastPath, 'ctrl+left');
        }
    }

    //Find out what page we are on
    _getCurrentPage() {
        let {groups} = this.props.data;
        let title = this.props.route.title;
        //if the title of the route matches the title of the group, that is the current page.
        return _.find(groups, function (result) {
            return result.groupIdentifier === title
        });
    }

    //Navigate to the next group (Tab)
    _goNextGroup(dir, path, source) {
        let callBack = (currentId) => {
            this.props.history.push(path);
            navigateEvent(this.state.currentPaths[currentId], this.props.data.groups[currentId].sections[0].sectionIdentifier, source);
        };

        dir === 'forward' ? this.setState({currentId: this.state.currentId += 1},
            callBack(this.state.currentId)
        ) :
        dir === 'back' ? this.setState({currentId: this.state.currentId -= 1},
            callBack(this.state.currentId)
        ) :
        dir === 'first' ? this.setState({currentId: 0},
            callBack(0)
        ) :
        dir === 'last' ? this.setState({currentId: this.state.currentPaths.length - 1},
           callBack(this.state.currentPaths.length - 1)
        ) : null
    }

    render() {
        if (propsAreValid(this.props.data, this)) {
            return (
                <div>
                    <Main data={this.props.data} {...this.props} legacyLayouts={this.state.legacyLayouts} orientation={this.state.screenOrientation} />

                    {this.state.oemGroup && this.state.compareModels ?
                        <StickyBanner brand={this.state.oemGroup.brand ? this.state.oemGroup.brand : null} ratings={this.state.oemGroup.ratings ? this.state.oemGroup.ratings : null} orientation={this.state.screenOrientation}>
                            <Price data={this.props.data.deviceInformation} />

                            {this.state.retailerGroup && this.state.retailerGroup.brand && this.state.retailerGroup.brand.button ?
                                <Button data={this.state.retailerGroup.brand.button} />
                                : null }
                        </StickyBanner>
                        : null }
                </div>
            )
        }
    }
}
export default VerticalPage
