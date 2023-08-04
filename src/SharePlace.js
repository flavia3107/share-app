import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress , getAddressFromCoords} from './Utility/Location';

class PlaceFinder{

    constructor() {
        const addrForm = document.querySelector('form');
        const locateUsrBtn = document.getElementById('locate-btn');
        this.shareBtn = document.getElementById('share-btn');

        locateUsrBtn.addEventListener('click', this.locateUserHandler.bind(this));
        this.shareBtn.addEventListener('click', this.sharePlaceHandler);
        addrForm.addEventListener('submit', this.findAddressHandler.bind(this));
    }

    sharePlaceHandler() {
        const shareLinkInput = document.getElementById('share-link');

        if (!navigator.clipboard) {
            shareLinkInput.select();
            return;
        }

        navigator.clipboard.writeText(shareLinkInput.value)
            .then(() => {
                alert('Copied into clipboard');
            })
            .catch(err => {
                console.log(err);
                shareLinkInput.select();
            });
    }

    selectPlace(coordinates, address) {
        if (this.map) {
            this.map.render(coordinates);
        } else {
            this.map = new Map(coordinates);
        }
        this.shareBtn.disabled = false;
        const shareLinkInput = document.getElementById('share-link');
        shareLinkInput.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${coordinates.lng}`;
    }

    locateUserHandler() {
        if (!navigator.geolocation) {
            alert('Location Feature is not available in your browser.')
            return;
        }
        
        const modal = new Modal('loading-modal-content', 'Loading location - please wait' )
        modal.show();
        navigator.geolocation.getCurrentPosition(
           async successResult => {
                modal.hide();
                const coordinates = {
                    lat: successResult.coords.latitude + Math.random() * 50,
                    lng: successResult.coords.longitude + Math.random() * 50
                };
                const address = await getAddressFromCoords(coordinates);
                modal.hide();
                this.selectPlace(coordinates, address)
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
        this.selectPlace(coordinates, address);
      } catch (error) {
          alert(error.message);
      }
      
      modal.hide();
  }

}

const placeFinder = new PlaceFinder();