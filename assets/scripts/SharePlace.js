/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/SharePlace.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SharePlace.js":
/*!***************************!*\
  !*** ./src/SharePlace.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Modal */ \"./src/UI/Modal.js\");\n/* harmony import */ var _UI_Map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI/Map */ \"./src/UI/Map.js\");\n/* harmony import */ var _Utility_Location__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Location */ \"./src/Utility/Location.js\");\n\n\n\nclass PlaceFinder {\n  constructor() {\n    const addrForm = document.querySelector('form');\n    const locateUsrBtn = document.getElementById('locate-btn');\n    this.shareBtn = document.getElementById('share-btn');\n    locateUsrBtn.addEventListener('click', this.locateUserHandler.bind(this));\n    this.shareBtn.addEventListener('click', this.sharePlaceHandler);\n    addrForm.addEventListener('submit', this.findAddressHandler.bind(this));\n  }\n  sharePlaceHandler() {\n    const shareLinkInput = document.getElementById('share-link');\n    if (!navigator.clipboard) {\n      shareLinkInput.select();\n      return;\n    }\n    navigator.clipboard.writeText(shareLinkInput.value).then(() => {\n      alert('Copied into clipboard');\n    }).catch(err => {\n      console.log(err);\n      shareLinkInput.select();\n    });\n  }\n  selectPlace(coordinates, address) {\n    if (this.map) {\n      this.map.render(coordinates);\n    } else {\n      this.map = new _UI_Map__WEBPACK_IMPORTED_MODULE_1__[\"Map\"](coordinates);\n    }\n    this.shareBtn.disabled = false;\n    const shareLinkInput = document.getElementById('share-link');\n    shareLinkInput.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;\n  }\n  locateUserHandler() {\n    if (!navigator.geolocation) {\n      alert('Location Feature is not available in your browser.');\n      return;\n    }\n    const modal = new _UI_Modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"]('loading-modal-content', 'Loading location - please wait');\n    modal.show();\n    navigator.geolocation.getCurrentPosition(async successResult => {\n      modal.hide();\n      const coordinates = {\n        lat: successResult.coords.latitude + Math.random() * 50,\n        lng: successResult.coords.longitude + Math.random() * 50\n      };\n      const address = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getAddressFromCoords\"])(coordinates);\n      modal.hide();\n      this.selectPlace(coordinates, address);\n    }, error => {\n      modal.hide();\n      alert('Could not locate! Please enter an address manually.');\n    });\n  }\n  async findAddressHandler(event) {\n    event.preventDefault();\n    const address = event.target.querySelector('input').value;\n    if (!address || address.trim().length === 0) {\n      alert('Invalid address entered = please try again');\n      return;\n    }\n    const modal = new _UI_Modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"]('loading-modal-content', 'Loading location - please wait!');\n    modal.show();\n    try {\n      const coordinates = await Object(_Utility_Location__WEBPACK_IMPORTED_MODULE_2__[\"getCoordsFromAddress\"])(address);\n      this.selectPlace(coordinates, address);\n    } catch (error) {\n      alert(error.message);\n    }\n    modal.hide();\n  }\n}\nconst placeFinder = new PlaceFinder();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU2hhcmVQbGFjZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9TaGFyZVBsYWNlLmpzP2Q1YTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kYWwgfSBmcm9tICcuL1VJL01vZGFsJztcbmltcG9ydCB7IE1hcCB9IGZyb20gJy4vVUkvTWFwJztcbmltcG9ydCB7IGdldENvb3Jkc0Zyb21BZGRyZXNzICwgZ2V0QWRkcmVzc0Zyb21Db29yZHN9IGZyb20gJy4vVXRpbGl0eS9Mb2NhdGlvbic7XG5cbmNsYXNzIFBsYWNlRmluZGVye1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGNvbnN0IGFkZHJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICAgICAgICBjb25zdCBsb2NhdGVVc3JCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYXRlLWJ0bicpO1xuICAgICAgICB0aGlzLnNoYXJlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlLWJ0bicpO1xuXG4gICAgICAgIGxvY2F0ZVVzckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMubG9jYXRlVXNlckhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc2hhcmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNoYXJlUGxhY2VIYW5kbGVyKTtcbiAgICAgICAgYWRkckZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5maW5kQWRkcmVzc0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc2hhcmVQbGFjZUhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHNoYXJlTGlua0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlLWxpbmsnKTtcblxuICAgICAgICBpZiAoIW5hdmlnYXRvci5jbGlwYm9hcmQpIHtcbiAgICAgICAgICAgIHNoYXJlTGlua0lucHV0LnNlbGVjdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoc2hhcmVMaW5rSW5wdXQudmFsdWUpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0NvcGllZCBpbnRvIGNsaXBib2FyZCcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgc2hhcmVMaW5rSW5wdXQuc2VsZWN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZWxlY3RQbGFjZShjb29yZGluYXRlcywgYWRkcmVzcykge1xuICAgICAgICBpZiAodGhpcy5tYXApIHtcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbmRlcihjb29yZGluYXRlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXAoY29vcmRpbmF0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhcmVCdG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3Qgc2hhcmVMaW5rSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUtbGluaycpO1xuICAgICAgICBzaGFyZUxpbmtJbnB1dC52YWx1ZSA9IGAke2xvY2F0aW9uLm9yaWdpbn0vbXktcGxhY2U/YWRkcmVzcz0ke2VuY29kZVVSSShhZGRyZXNzKX0mbGF0PSR7Y29vcmRpbmF0ZXMubGF0fSZsbmc9JHtjb29yZGluYXRlcy5sbmd9YDtcbiAgICB9XG5cbiAgICBsb2NhdGVVc2VySGFuZGxlcigpIHtcbiAgICAgICAgaWYgKCFuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICAgIGFsZXJ0KCdMb2NhdGlvbiBGZWF0dXJlIGlzIG5vdCBhdmFpbGFibGUgaW4geW91ciBicm93c2VyLicpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKCdsb2FkaW5nLW1vZGFsLWNvbnRlbnQnLCAnTG9hZGluZyBsb2NhdGlvbiAtIHBsZWFzZSB3YWl0JyApXG4gICAgICAgIG1vZGFsLnNob3coKTtcbiAgICAgICAgbmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihcbiAgICAgICAgICAgYXN5bmMgc3VjY2Vzc1Jlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgbW9kYWwuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBsYXQ6IHN1Y2Nlc3NSZXN1bHQuY29vcmRzLmxhdGl0dWRlICsgTWF0aC5yYW5kb20oKSAqIDUwLFxuICAgICAgICAgICAgICAgICAgICBsbmc6IHN1Y2Nlc3NSZXN1bHQuY29vcmRzLmxvbmdpdHVkZSArIE1hdGgucmFuZG9tKCkgKiA1MFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IGdldEFkZHJlc3NGcm9tQ29vcmRzKGNvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICBtb2RhbC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RQbGFjZShjb29yZGluYXRlcywgYWRkcmVzcylcbiAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBhbGVydCgnQ291bGQgbm90IGxvY2F0ZSEgUGxlYXNlIGVudGVyIGFuIGFkZHJlc3MgbWFudWFsbHkuJylcbiAgICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgYXN5bmMgZmluZEFkZHJlc3NIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSBldmVudC50YXJnZXQucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZTtcbiAgICAgICAgaWYgKCFhZGRyZXNzIHx8IGFkZHJlc3MudHJpbSgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgYWRkcmVzcyBlbnRlcmVkID0gcGxlYXNlIHRyeSBhZ2FpbicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoXG4gICAgICAgICAgICAnbG9hZGluZy1tb2RhbC1jb250ZW50JyxcbiAgICAgICAgICAgICdMb2FkaW5nIGxvY2F0aW9uIC0gcGxlYXNlIHdhaXQhJ1xuICAgICAgICApO1xuXG4gICAgICBtb2RhbC5zaG93KCk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjb29yZGluYXRlcyA9IGF3YWl0IGdldENvb3Jkc0Zyb21BZGRyZXNzKGFkZHJlc3MpO1xuICAgICAgICB0aGlzLnNlbGVjdFBsYWNlKGNvb3JkaW5hdGVzLCBhZGRyZXNzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgYWxlcnQoZXJyb3IubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIG1vZGFsLmhpZGUoKTtcbiAgfVxuXG59XG5cbmNvbnN0IHBsYWNlRmluZGVyID0gbmV3IFBsYWNlRmluZGVyKCk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/SharePlace.js\n");

/***/ }),

/***/ "./src/UI/Map.js":
/*!***********************!*\
  !*** ./src/UI/Map.js ***!
  \***********************/
/*! exports provided: Map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Map\", function() { return Map; });\nclass Map {\n  constructor(coords) {\n    this.render(coords);\n  }\n  render(coordinates) {\n    if (!google) {\n      alert('Could not load maps library - please try again later!');\n      return;\n    }\n    const map = new google.maps.Map(document.getElementById('map'), {\n      center: coordinates,\n      zoom: 15\n    });\n    new google.maps.Marker({\n      position: coordinates,\n      map: map\n    });\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVUkvTWFwLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL1VJL01hcC5qcz9iNTc5Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKGNvb3Jkcykge1xuICAgICAgICB0aGlzLnJlbmRlcihjb29yZHMpO1xuICAgIH1cblxuXG4gICAgcmVuZGVyKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgIGlmICghZ29vZ2xlKSB7XG4gICAgICAgICAgICBhbGVydCgnQ291bGQgbm90IGxvYWQgbWFwcyBsaWJyYXJ5IC0gcGxlYXNlIHRyeSBhZ2FpbiBsYXRlciEnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICBjb25zdCBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xuICAgICAgICAgICAgY2VudGVyOiBjb29yZGluYXRlcyxcbiAgICAgICAgICAgIHpvb206IDE1XG4gICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICAgICAgcG9zaXRpb246IGNvb3JkaW5hdGVzLFxuICAgICAgICAgICAgbWFwOiBtYXBcbiAgICAgICAgfSk7XG4gICAgfVxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/UI/Map.js\n");

/***/ }),

/***/ "./src/UI/Modal.js":
/*!*************************!*\
  !*** ./src/UI/Modal.js ***!
  \*************************/
/*! exports provided: Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Modal\", function() { return Modal; });\nclass Modal {\n  constructor(contentId, fallbackText) {\n    this.fallbackText = fallbackText;\n    this.contentTemplateElement = document.getElementById(contentId);\n    this.modalTemplateEl = document.getElementById('modal-template');\n  }\n  show() {\n    if ('content' in document.createElement('template')) {\n      const modalElements = document.importNode(this.modalTemplateEl.content, true);\n      this.modalElement = modalElements.querySelector('.modal');\n      this.backdropElement = modalElements.querySelector('.backdrop');\n      const contentElement = document.importNode(this.contentTemplateElement.content, true);\n      this.modalElement.appendChild(contentElement);\n      document.body.insertAdjacentElement('afterbegin', this.modalElement);\n      document.body.insertAdjacentElement('afterbegin', this.backdropElement);\n    } else {\n      alert(this.fallbackText);\n    }\n  }\n  hide() {\n    if (this.modalElement) {\n      document.body.removeChild(this.modalElement);\n      document.body.removeChild(this.backdropElement);\n      this.modalElement = null;\n      this.backdropElement = null;\n    }\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVUkvTW9kYWwuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVUkvTW9kYWwuanM/MjcwMiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTW9kYWwge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnRJZCwgZmFsbGJhY2tUZXh0KSB7XG4gICAgICAgIHRoaXMuZmFsbGJhY2tUZXh0ID0gZmFsbGJhY2tUZXh0O1xuICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250ZW50SWQpO1xuICAgICAgICB0aGlzLm1vZGFsVGVtcGxhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbC10ZW1wbGF0ZScpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIGlmICgnY29udGVudCcgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKSkge1xuICAgICAgICAgICAgY29uc3QgbW9kYWxFbGVtZW50cyA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy5tb2RhbFRlbXBsYXRlRWwuY29udGVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm1vZGFsRWxlbWVudCA9IG1vZGFsRWxlbWVudHMucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XG4gICAgICAgICAgICB0aGlzLmJhY2tkcm9wRWxlbWVudCA9IG1vZGFsRWxlbWVudHMucXVlcnlTZWxlY3RvcignLmJhY2tkcm9wJyk7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGhpcy5jb250ZW50VGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsIHRydWUpO1xuXG4gICAgICAgICAgICB0aGlzLm1vZGFsRWxlbWVudC5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJiZWdpbicsIHRoaXMubW9kYWxFbGVtZW50KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmJlZ2luJywgdGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQodGhpcy5mYWxsYmFja1RleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kYWxFbGVtZW50KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMubW9kYWxFbGVtZW50KTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5iYWNrZHJvcEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5tb2RhbEVsZW1lbnQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5iYWNrZHJvcEVsZW1lbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/UI/Modal.js\n");

/***/ }),

/***/ "./src/Utility/Location.js":
/*!*********************************!*\
  !*** ./src/Utility/Location.js ***!
  \*********************************/
/*! exports provided: getCoordsFromAddress, getAddressFromCoords */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCoordsFromAddress\", function() { return getCoordsFromAddress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAddressFromCoords\", function() { return getAddressFromCoords; });\nconst GOOGLE_API = 'AIzaSyCJpkEA3-h5QwLGwQqqmgLAsY3r8mPci00';\nasync function getCoordsFromAddress(address) {\n  const urlAddress = encodeURI(address);\n  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${GOOGLE_API}`);\n  if (!response) {\n    throw new Error('Failed to fetch coordinates. Please try again!');\n  }\n  const data = await response.json();\n  if (data.error_message) {\n    throw new Error(data.error_message);\n  }\n  const coordinates = data.results[0].geometry.location;\n  return coordinates;\n}\nasync function getAddressFromCoords(coords) {\n  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${GOOGLE_API}`);\n  if (!response) {\n    throw new Error('Failed to fetch address. Please try again!');\n  }\n  const data = await response.json();\n  if (data.error_message) {\n    throw new Error(data.error_message);\n  }\n  const address = data.results[0].formatted_address;\n  return address;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVXRpbGl0eS9Mb2NhdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9VdGlsaXR5L0xvY2F0aW9uLmpzPzQyZGUiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgR09PR0xFX0FQSSA9ICdBSXphU3lDSnBrRUEzLWg1UXdMR3dRcXFtZ0xBc1kzcjhtUGNpMDAnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q29vcmRzRnJvbUFkZHJlc3MoYWRkcmVzcykge1xuICAgIGNvbnN0IHVybEFkZHJlc3MgPSBlbmNvZGVVUkkoYWRkcmVzcyk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9hZGRyZXNzPSR7dXJsQWRkcmVzc30ma2V5PSR7R09PR0xFX0FQSX1gKTtcblxuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggY29vcmRpbmF0ZXMuIFBsZWFzZSB0cnkgYWdhaW4hJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBpZiAoZGF0YS5lcnJvcl9tZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9yX21lc3NhZ2UpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZGF0YS5yZXN1bHRzWzBdLmdlb21ldHJ5LmxvY2F0aW9uO1xuICAgIHJldHVybiBjb29yZGluYXRlcztcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWRkcmVzc0Zyb21Db29yZHMoY29vcmRzKSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9sYXRsbmc9JHtjb29yZHMubGF0fSwke2Nvb3Jkcy5sbmd9JmtleT0ke0dPT0dMRV9BUEl9YCk7XG4gICAgXG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBhZGRyZXNzLiBQbGVhc2UgdHJ5IGFnYWluIScpO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgaWYgKGRhdGEuZXJyb3JfbWVzc2FnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvcl9tZXNzYWdlKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRyZXNzID0gZGF0YS5yZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzO1xuICAgIHJldHVybiBhZGRyZXNzO1xufSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/Utility/Location.js\n");

/***/ })

/******/ });