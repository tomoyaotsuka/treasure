import * as lib from 'lib';
export default class Treasure {
  constructor () {
    this.elements = [];
  }
  init ( $element ) {
    const that = this;
    let obj;
    $element.each( function (i) {
      const $this = $(this);
      obj = {
        element:  $this,
        category: null,
        action:   'load',
        label:    $this.attr('data-track-label'),
        area:     'default',
        runtime:  $this.attr('runtime'),
        debug:    $this.attr('debug'),
        offset:   '',
        height:   '',
        top:      '',
        bottom:   '',
        timer:    '',
        flag:     { resolve: true, reject: false }
      };
      that.elements.push( obj );
      $(window).on( 'scroll', function () { that.judge( i ) });
    });
    $(window).on( 'load', function () { that.calc() });
  }
  calc () {
    const windowHeight = $(window).height();
    // for ( const [key, value] of Object.entries( that.elements )) {
    for ( const key of Object.keys( this.elements ) ) {
      const value  = this.elements[key];
      value.offset = $(value.element).offset().top;
      value.height = $(value.element).outerHeight();
      value.top    = value.offset - windowHeight / 2;
      value.bottom = value.offset + value.height - windowHeight / 2;
      this.reject( key );
    }
  }
  update () {
    for ( const key of Object.keys( this.elements ) ) {
      this.judge( key );
    }
  }
  judge ( i ) {
    const target = this.elements[i];
    let scrolledValue = $(window).scrollTop();
    if ( $(target.element).is(':visible') && target.flag.resolve && target.top < scrolledValue && scrolledValue < target.bottom ) {
      this.resolve( i );
      target.flag.resolve = false;
      target.flag.reject  = true;
    }
    else if ( target.top > scrolledValue || scrolledValue > target.bottom ) {
      if ( target.flag.reject ) {
        this.reject( i );
        target.flag.resolve = true;
        target.flag.reject  = false;
      }
    }
  }
  resolve ( i ) {
    const that = this;
    const target = this.elements[i];
    target.timer = setTimeout( function () {
      if ( target.debug ) {
        const targetClass = $(target.element).attr('class');
        const targetCategory = lib.getTrackCategory( $(target.element) );
        const targetLabel = $(target.element).attr('data-track-scroll');
        const targetRuntime = $(target.element).attr('runtime');
        const message = `Resolve: Target="${targetClass}", Category="${targetCategory}", Label="${targetLabel}", Runtime="${targetRuntime}"`;
        console.log( message );
      }
      else {
        customATE.trackEvent( $(target.element), target.category, target.action, target.label );
      }
      target.flag.resolve = false;
      target.flag.reject  = false;
    }, target.runtime );
  }
  reject ( i ) {
    const that = this;
    const target = this.elements[i];
    if ( target.debug ) { console.log( `Reject: ` + lib.getTrackCategory( $(target.element) ) ); }
    clearTimeout( target.timer );
  }
}
