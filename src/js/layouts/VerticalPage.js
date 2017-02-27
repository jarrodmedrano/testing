import React from 'react'
import { findDOMNode } from 'react-dom'
import '../../styles/mwf-west-european-default.min.css!';
import '../../styles/mwf-ie9-west-european-default.min.css!';
import '../../styles/main.scss!';
import dataPropTypes, {verticalPagePropTypes} from '../../data/dataProps';
import propsAreValid from '../lib/util';
import Vertical from '../components/vertical/Vertical';
import StickyBanner from '../components/stickynav/StickyBanner';
import Tabs from '../components/stickynav/Tabs';
import Footer from '../components/stickynav/StickyFooter';
import StickyButton from '../components/stickynav/StickyButton';
import Price from '../components/price/Price';
import DownArrow from '../components/downarrow/DownArrow';
import _ from 'lodash';
import keydown from 'react-keydown';
import Element from '../components/scrollElement/Element';
import Scroll  from 'react-scroll';
let scroller = Scroll.scroller;


class VerticalPage extends React.Component {
    constructor(props) {
        super(props);
        let title = this.props.route.title;
        let {groups} = this.props.data;

        //Find the title of the group and if it's the same title as the route, that's the current page
        let currentPage = _.find(groups, function (result) {
            return result.groupIdentifier === title
        });

        let currentBrandColor = currentPage.brand.color;

        let currentPaths = _.map(this.props.routes[0].childRoutes, 'path');

        let currentId = currentPaths.indexOf(title);

        //start at the first section
        let currentSections = currentPage.sections;

        let currentSectionClass = `${title}-section-`;

        //set Current page in the state
        this.state = {
            currentPage: currentPage,
            currentBrandColor: currentBrandColor,
            currentSections: currentSections,
            currentPaths: currentPaths,
            currentId: currentId,
            currentSection: 0,
            currentSectionClass: currentSectionClass,
            currentTitle: title
        }
    }


    @keydown('cmd+right', 'ctrl+right')
    _nextGroup(e) {
        e.preventDefault();
        if (this.state.currentId < this.state.currentPaths.length - 1) {
            return this.props.history.push(this.state.currentPaths[this.state.currentId + 1]);
        } else {
            return this.props.history.push("/");
        }
    }

    @keydown('cmd+left', 'ctrl+left')
    _prevGroup(e) {
        e.preventDefault();
        if (this.state.currentId === -1) {
            return this.props.history.push(this.state.currentPaths[this.state.currentPaths.length - 1]);
        } else if (this.state.currentId > 0) {
            return this.props.history.push(this.state.currentPaths[this.state.currentId - 1]);
        } else {
            return this.props.history.push("/");
        }
    }

    @keydown('cmd+down', 'ctrl+down')
    _nextSection(e) {
        e.preventDefault();
        if (this.state.currentSection + 1 < this.state.currentSections.length) {
            this._goNext();
        } else {
            return false
        }
    }

    @keydown('cmd+up', 'ctrl+up')
    _prevSection(e) {
        e.preventDefault();
        if (this.state.currentSection - 1 >= 0) {
            this._goPrevious();
        } else {
            return false
        }
    }

    @keydown('alt+0', 'alt+1', 'alt+2', 'alt+3', 'alt+4', 'alt+5', 'alt+6', 'alt+7', 'alt+8', 'alt+9')
    _toSection(e) {
        e.preventDefault();
        let sectionKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

        sectionKeys.map(function (result, id) {
            if (id < this.state.currentSections.length && e.which === result) {
                return scroller.scrollTo(`${this.state.currentTitle}-section-${this.state.currentSection + id}`);
            }
        }, this);
    }

    _handleNext(e) {
        e.preventDefault();
        if (this.state.currentSection + 1 < this.state.currentSections.length) {
            this._goNext();
        } else if (this.state.currentSection - 1 >= 0) {
            this._goTop();
        }
    }

    _goNext() {
        this.setState({currentSection: this.state.currentSection += 1},
            scroller.scrollTo(`${this.state.currentTitle}-section-${this.state.currentSection}`)
        );
    }

    _goPrevious() {
        this.setState({currentSection: this.state.currentSection -= 1},
            scroller.scrollTo(`${this.state.currentTitle}-section-${this.state.currentSection}`)
        );
    }

    _goTop() {
        this.setState({currentSection: 0});
        scroller.scrollTo(`${this.state.currentTitle}-section-0`);
    }

    render() {
        if (propsAreValid(this.props.data)) {
            let {ratings, deviceInformation, groups} = this.props.data;

            let oemGroup = _.find(groups, function (result) {
                if (result.groupIdentifier === 'oem') {
                    return result
                }
            });

            let retailerGroup = _.find(groups, function (result) {
                if (result.groupIdentifier === 'retailer') {
                    return result
                }
            });

            //Find out if there are legacy layouts in this page (or not)
            let legacyLayouts = !!_.find(this.state.currentSections, function(result) {
                return _.includes(result.layout, 'feature', 'featureCta', 'ksp', 'centeredBackdropTemplate', 'threeColSpecs')
            });

            return (
                <div>
                    {groups.length > 1 ? <Tabs data={this.props.data} {...this.props}  /> : null }
                    {oemGroup ? 
                        <StickyBanner data={oemGroup}>
                            { oemGroup.brand.price ? 
                                <Price data={oemGroup.brand.price}/> 
                            : null }
                            
                            { retailerGroup ? 
                                <StickyButton data={retailerGroup} /> 
                            : null }
                        </StickyBanner> 
                    : null }
                    
                    <main id="main">
                        {this.state.currentPage.sections ?
                            this.state.currentPage.sections.map(function (result, id) {
                                return (
                                    <Element name={this.state.currentSectionClass + id} key={id}>
                                        <Vertical data={result} brandColor={this.state.currentBrandColor} />
                                    </Element>
                                )
                            }, this)
                            : null
                        }
                    </main>
                    {this.state.currentPage.sections && !legacyLayouts ? <Footer data={this.state.currentPage} /> : <DownArrow data={this.state.currentPage} onClick={(event)=> this._handleNext(event)} />}
                </div>
            )
        }
    }
}

VerticalPage.propTypes = dataPropTypes(verticalPagePropTypes);

export default VerticalPage
