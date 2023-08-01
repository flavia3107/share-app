class PlaceFinder{

    constructor() {
        const addrForm = document.querySelector('form');
        const locateUsrBtn = document.getElementById('locate-btn');

        locateUsrBtn.addEventListener('click', this.locateUserHandler);
        addrForm.addEventListener('submit', this.findAddressHandler);
    }


    locateUserHandler() {
        if (!navigator.geolocation) {
            alert('Location Feature is not available in your browser.')
            return;
        }
        navigator.geolocation.getCurrentPosition(
            successResult => {
                const coordinates = {
                    lat: successResult.coords.latitude + Math.random() * 50,
                    lng: successResult.coords.longitude + Math.random() * 50
                };
             },
            error => {
                alert('Could not locate! Please enter an address manually.')
             });

    }

    findAddressHandler() {
        
    }

}

const placeFinder = new PlaceFinder();