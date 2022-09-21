## Welcome

If you are a gamer / Professional looking to buy PC, we can hook you up with a really good value for money PC. Contact me or visit our website from below.
If you are in india and need of a website for your business contact me, I work at [coarde](https://coarde.com) we do professional websites, digital marketting, IT Administration and setup for business.

Contact me 
* Email: harisankar@coarde.com
* Telegram: [t.me/virusz4274](https://t.me/virusz4274)

### Some Links of mine

-[Coarde -Buy Custom High performance PC (India only)](https://coarde.com)

-[Chaotic-aur Indian Mirror](https://chaotic-aur.coarde.com/)

-[Backup Snap packages](https://github.com/virusz4274/snapbackup)

-[DISCORD RICH PRESENCE](https://github.com/virusz4274/discord-rich-presence)

-[Discord Server](https://coarde.com/discord)

-[Github Profile](https://github.com/virusz4274)

-[uoykcufoa.ml](http://uoykcufoa.ml)

-[Youtube](https://www.youtube.com/channel/UChdnSUvdnUzzUHyvesJUYUw)

-[Instagram](https://instagram.com/_hari_sankar_)

<html>
  <div id="smart-button-container">
      <div style="text-align: center;">
        <div id="paypal-button-container"></div>
      </div>
    </div>
  <script src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD" data-sdk-integration-source="button-factory"></script>
  <script>
    function initPayPalButton() {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal',

        },

        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"amount":{"currency_code":"USD","value":200}}]
          });
        },

        onApprove: function(data, actions) {
          return actions.order.capture().then(function(orderData) {

            // Full available details
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

            // Show a success message within this page, e.g.
            const element = document.getElementById('paypal-button-container');
            element.innerHTML = '';
            element.innerHTML = '<h3>Thank you for your payment!</h3>';

            // Or go to another URL:  actions.redirect('thank_you.html');

          });
        },

        onError: function(err) {
          console.log(err);
        }
      }).render('#paypal-button-container');
    }
    initPayPalButton();
  </script>
</html>
