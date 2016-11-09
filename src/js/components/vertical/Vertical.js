import React from 'react'
import classNames from 'classnames';
import Parallax from '../../../../prototypes/js/components/parallax/Parallax';
import Video from '../video/Video';
import Apps from '../../../../prototypes/js/components/apps/Apps';
import Config from '../../../../prototypes/js/components/config/Config';
import Hero from '../hero/Hero';
import ImmersiveHero from '../hero/ImmersiveHero';
import Mosaic from '../mosaic/Mosaic';
import LegacyFeature from '../legacy/legacyFeature';
import LegacyKSP from '../legacy/legacyKsp';
import LegacyCenteredBackdrop from '../legacy/legacycenteredbackdrop';

class Vertical extends React.Component {

    render() {

        let verticalClass = classNames('scene-vertical', this.props.data.groupIdentifier);

        let layout = this.props.data.layout;

        return (
            <section className={verticalClass} id={this.props.data.title.split(' ').join('-').toLowerCase()}>
                {layout === 'hero' ?
                    <Hero data={this.props.data}/> : null
                }
                {layout === 'immersive-hero' ?
                    <ImmersiveHero data={this.props.data}/> : null
                }
                {layout === 'parallax' ?
                    <Parallax data={this.props.data}/> : null
                }
                {layout === 'video' ?
                    <Video data={this.props.data}/> : null
                }
                {layout === 'apps' ?
                    <Apps data={this.props.data}/> : null
                }
                {layout === 'config' ?
                    <Config data={this.props.data}/> : null
                }
                {layout === 'mosaic' ?
                    <Mosaic data={this.props.data}/> : null
                }
                {layout === 'feature' ?
                    <LegacyFeature data={this.props.data}/> : null
                }
                {layout === 'featureCta' ?
                    <LegacyFeature data={this.props.data}/> : null
                }
                {layout === 'ksp' ?
                    <LegacyKSP data={this.props.data}/> : null
                }
                {/*  Implement as variants of 'ksp'?
                {layout === 'ksp_reversed' ?
                    <LegacyKSP data={this.props.data}/> : null
                }
                {layout === 'ksp_rs' ?
                    <LegacyKSP data={this.props.data}/> : null
                }
                */}
                {layout === 'centeredBackdropTemplate' ?
                    <LegacyCenteredBackdrop data={this.props.data}/> : null
                }
            </section>
        )
    }
}

export default Vertical