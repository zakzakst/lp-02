import $ from 'jquery';
import { voicesFunc } from './common/voices';
import { pageLoaderFunc } from './common/page-loader';
import { goTopFunc } from './common/go-top';
import { galleryFunc } from './common/gallery';
import { cycleImageFunc } from './common/cycle-image';
import { countUpFunc } from './common/count-up';
import { headerFunc } from './common/header';

$(function() {
  voicesFunc();
  pageLoaderFunc();
  goTopFunc();
  galleryFunc();
  cycleImageFunc();
  countUpFunc();
  headerFunc();
  new WOW().init();
});
