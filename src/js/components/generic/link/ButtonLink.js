import React from 'react';
import propsAreValid, {externalNavigate, internalNavigate, cleanHtml} from '../../../lib/util';
import {linkPropTypes} from '../../../../data/dataProps';

class ButtonLink extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            internal: false,
            mosaic: false
        }
    }

    componentWillMount() {
        if (this._isInternal(this.props.to) && this.props.blockType !== "buttonExternal") {
            this.setState({
                internal: true
            })
        }

        if (this.props.layout && this.props.layout === 'mosaic') {
            this.setState({
                mosaic: true
            })
        }
    }

    _isInternal(to) {
        if (to.startsWith('/')) return true;
    }

    _handleClick(target, internal) {
        if (internal) {
            //from '../../../lib/util';
            internalNavigate(target, this.context.router);
        } else {
            externalNavigate(target);
        }
    }

    _buildLink() {
        const {to, children, ...rest} = this.props;

        let linkProps = {
            onClick: (e) => {
                e.preventDefault();
                this._handleClick(to, this.state.internal)
            },
            draggable: 'false',
        };

        const linkElement = React.createElement(
            'a',
            {
                ...linkProps,
                to: to,
                href: to,
                ...rest,
                dangerouslySetInnerHTML: {__html: cleanHtml(children)}
            }
        );

        const mosaicLinkElement = React.createElement(
            'a',
            {
                ...linkProps,
                to: to,
                href: to,
                className: 'mosaic-link'
            },
            children
        );

        if(this.state.mosaic === true) {
            return mosaicLinkElement
        } else {
            return linkElement
        }
    }

    render() {
        if (propsAreValid(this.props, this)) {
            return this._buildLink();
        }
        return null
    }
}

ButtonLink.defaultProps = {
    to: '',
    children: ''
};

ButtonLink.propTypes = linkPropTypes;

ButtonLink.contextTypes = {
    router: React.PropTypes.object,
};

export default ButtonLink;