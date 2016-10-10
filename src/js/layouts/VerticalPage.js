import React from 'react'
import '../../styles/main.scss!';

import _ from 'lodash/lodash';

import Vertical from '../components/vertical/Vertical';
import StickyBanner from '../components/stickynav/StickyBanner';
import Tabs from '../components/stickynav/Tabs';
import Footer from '../components/stickynav/Footer';

class VerticalPage extends React.Component {

    render() {

        /* TODO make names independent */


        let { ratings, deviceInformation, groups, branding } = this.props.data;

        let title = this.props.route.title;


        let currentPage = _.find(groups, function(result) {
            return result.groupIdentifier === title
        }, this);

        let oemGroup = _.find(groups, function(result) {
            if(result.groupIdentifier === 'oem') {
                return result
            }
        });


        return (
            <div>
                {groups.length > 1 ? <Tabs routes={this.props.routes} params={this.props.params} groups={ groups } /> : null }
                {oemGroup.brand ? <StickyBanner oemratings={ ratings } price={ deviceInformation } branding={ oemGroup.brand } groups={ groups } currentPage={ currentPage }  /> : null }
                <main id="main">
                    {currentPage.sections ?
                        currentPage.sections.map(function(result, id) {
                            return (
                                <Vertical key={id} vertical={result} />
                            )
                        })
                        : null
                    }
                </main>
                {currentPage.sections ? <Footer footer={currentPage.sections} /> : null}
            </div>
        );
    }
}

export default VerticalPage