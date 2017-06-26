import styles from '../styles/app.scss'

import { TweenLite, TimelineLite, CSSPlugin } from 'gsap'
import * as lib from 'lib'

$(function() {
  const init = new Init();
});

class Init {
  constructor () {
    lib.setTreasure();
  }
}
