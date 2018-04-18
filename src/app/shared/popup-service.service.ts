import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class PopupService {

  cancelChanged: Subject<string> = new Subject<string>();

  constructor() {
  }

  /**
   *
   * @returns {{header: string; color: string; widthProsentage: number; animationDuration: number; showButtons: boolean; confirmBtnContent: string; cancleBtnContent: string; confirmBtnClass: string; cancleBtnClass: string; animation: string}}
   */
  initDeletePopupOptions() {
    return {
      header: "Delete Book",
      color: "#ff6d6d", // red, blue....
      widthProsentage: 20, // The with of the popou measured by browser width
      animationDuration: 0.7, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "Delete", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-danger", // your class for styling the confirm button
      cancleBtnClass: "btn btn-primary", // you class for styling the cancel button
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
  }

  /**
   *
   * @returns {{header: string; color: string; widthProsentage: number; animationDuration: number; showButtons: boolean; confirmBtnContent: string; cancleBtnContent: string; confirmBtnClass: string; cancleBtnClass: string; animation: string}}
   */
  initDuplicatePopupOptions() {
    return {
      header: "Book already exists!",
      color: "#ff6d6d", // red, blue....
      widthProsentage: 20, // The with of the popou measured by browser width
      animationDuration: 0.7, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: "Ok", // The text on your confirm button
      cancleBtnContent: "Cancel", // the text on your cancel button
      confirmBtnClass: "btn btn-success", // your class for styling the confirm button
      cancleBtnClass: "btn btn-primary", // you class for styling the cancel button
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
  }

  /**
   *
   * @param {string} header
   * @returns {{header: string; color: string; widthProsentage: number; animationDuration: number; showButtons: boolean; animation: string}}
   */
  initEditPopupOptions(header: string) {
    return {
      header: header,
      color: "#95a3f9", // red, blue....
      widthProsentage: 25, // The with of the popou measured by browser width
      animationDuration: 1, // in seconds, 0 = no animation
      showButtons: false, // You can hide this in case you want to use custom buttons
      animation: "bounceInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
    };
  }

}
