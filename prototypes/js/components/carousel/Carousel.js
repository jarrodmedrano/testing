import React from 'react';
import CarouselSlide from './CarouselSlide';
import SequenceIndicator from './SequenceIndicator';
import './Carousel.scss';
import classNames from 'classnames'

class Carousel extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      activeSlide: 0,
      slideDirection: 'next'
    }
  }

  _updateSlide(index) {

    this.setState(
        {
          activeSlide: index
        }
    );
  }

  _nextSlide(index, dir) {

    this.setState({ slideDirection: dir });

    if(this.state.activeSlide < this.props.slides.length-1 && dir === 'next') {
      this.setState({ activeSlide: index + 1 });
    } else if(this.state.activeSlide === this.props.slides.length-1 && dir === 'next') {
      this.setState({ activeSlide: 0 });
    }

    if(this.state.activeSlide > 0 && dir === 'previous') {
      this.setState({ activeSlide: index - 1 });
    } else if(this.state.activeSlide === 0 && dir === 'previous') {
      this.setState({ activeSlide: this.props.slides.length-1 });
    }
  }

  _isFullScreen() {
    return this.props.fullscreen === 'true' ? 'f-fullscreen': ''
  }

  render(){

    let carousel_style = {
      "TouchAction": "pan-y",
      "WebkitUserSelect": "none",
      "WebkitUserDrag": "none",
      "WebkitTapHighlightColor": "rgba(0, 0, 0, 0)"
    };

    let carouselClass = classNames(this._isFullScreen(), 'c-carousel f-multi-slide theme-dark f-scrollable-previous f-scrollable-next');

    return(
          <div className={carouselClass} role="region" aria-label="New Products" style={carousel_style}>
            <button onClick={() => this._nextSlide(this.state.activeSlide, 'previous')} onTouchEnd={() => this._nextSlide(this.state.activeSlide, 'previous')} className="c-flipper f-left" aria-label="View previous" title="View previous"></button>
            <button onClick={() => this._nextSlide(this.state.activeSlide, 'next')} onTouchEnd={() => this._nextSlide(this.state.activeSlide, 'next')} className="c-flipper f-right" aria-label="View next" title="View next"></button>
          <div>
            <ul>
              {this.props.slides.map(function(result, id) {
                return (
                  <CarouselSlide
                      key={result.id}
                      slideTitle={result.title}
                      slideSubTitle={result.subTitle}
                      vp4={result.vp4}
                      vp3={result.vp3}
                      vp2={result.vp2}
                      slideButton={result.buttonText}
                      activeSlide={this.state.activeSlide}
                      myKey={id}
                      slideDirection={this.state.slideDirection}
                  />
                    )
              }, this)}
            </ul>
          </div>

          <div className="c-sequence-indicator" role="radiogroup">

            {this.props.slides.map(function(result, id) {
                return (
                <SequenceIndicator
                    key={result.id}
                    slideTitle={result.title}
                    activeSlide={this.state.activeSlide}
                    myKey={id}
                    updateSlide={this._updateSlide}
                />
                    )
            }, this)}

          </div>
      </div>
    )
  }
}

export default Carousel