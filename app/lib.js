import Treasure from 'treasure'


/**
 * Set Treasure
 * @function
 */

export function setTreasure () {
  window.treasure = new Treasure();
  treasure.init( $('[data-track-scroll]') );
}


/**
 * Qet DataTrackCategory
 * @function
 */

export function getTrackCategory ( _this ) {
  let category = _this.attr('data-track-category');
  if ( _this.closest('[data-track-category]').length ) {
    category = _this.closest('[data-track-category]').data('track-category');
  }
  let categories = [category];
  if ( _this.closest('[data-track-category-prefix]').length ) {
    categories.unshift( _this.closest('[data-track-category-prefix]').data('track-category-prefix') );
  }
  if ( _this.closest('[data-track-category-suffix]').length ) {
    categories.push( _this.closest('[data-track-category-suffix]').data('track-category-suffix') );
  }
  return category = categories.join('_');
}
