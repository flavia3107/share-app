import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress } from './Utility/Location';

class PlaceFinder{

    constructor() {
        const addrForm = document.querySelector('form');
        const locateUsrBtn = document.getElementById('locate-btn');

        locateUsrBtn.addEventListener('click', this.locateUserHandler.bind(this));
        addrForm.addEventListener('submit', this.findAddressHandler.bind(this));
    }

    selectPlace(coordinates) {
        if (this.map) {
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert('Location Feature is not available in your browser.')
            return;
        }
        
        const modal = new Modal('loading-modal-content', 'Loading location - please wait' )
        modal.show();
        navigator.geolocation.getCurrentPosition(
            successResult => {
                modal.hide();
                const coordinates = {
                    lat: successResult.coords.latitude + Math.random() * 50,
                    lng: successResult.coords.longitude + Math.random() * 50
                };
                this.selectPlace(coordinates)
             },
            error => {
                modal.hide();
                alert('Could not locate! Please enter an address manually.')
             });
    }

  async findAddressHandler(event) {
        event.preventDefault();
        const address = event.target.querySelector('input').value;
        if (!address || address.trim().length === 0) {
            alert('Invalid address entered = please try again');
            return;
        }

        const modal = new Modal(
            'loading-modal-content',
            'Loading location - please wait!'
        );

      modal.show();
      try {
        const coordinates = await getCoordsFromAddress(address);
        this.selectPlace(coordinates);
      } catch (error) {
          alert(error.message);
      }
      
      modal.hide();
  }

}

const placeFinder = new PlaceFinder();