(function ($, Selectize) {
  Selectize.define('accessibility', function (options) {
    var self = this;

    if (typeof this.accessibility === 'undefined') {
      this.accessibility = {};
    }

    this.accessibility.helpers = {
      randomId: function (opt) {
        var opt = opt || {};
        var str = '';
        var base = {
          base62: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
          base36: 'abcdefghijklmnopqrstuvwxyz0123456789',
          base10: '0123456789'
        }

        opt.length = opt.length || 10;
        opt.strBase = base[opt.base] || base['base36'];
        opt.baseLength = opt.strBase.length;

        for (var i = 0; i < opt.length; i++) str += opt.strBase[Math.floor(opt.baseLength * Math.random())];
        return str;
      }
    };

    this.accessibility.liveRegion = {
      $region: '',
      announce: function (msg, expire) {
        var $msg = $('<div>' + msg + '</div>');
        self.accessibility.liveRegion.$region.append($msg);
        setTimeout(function () {
          self.accessibility.liveRegion.$region.empty();
        }, expire || 3000);
      },
      setAttributes: function () {
        self.accessibility.liveRegion.$region.attr({
          'aria-live': 'assertive',
          'role': 'log',
          'aria-relevant': 'additions',
          'aria-atomic': 'false'
        })
      },
      setStyle: function () {
        self.accessibility.liveRegion.$region.css({
          'position': 'absolute',
          'width': '1px',
          'height': '1px',
          'margin-top': '-1px',
          'clip': 'rect(1px, 1px, 1px, 1px)',
          'overflow': 'hidden'
        });
      },
      eventsHandler: function () {

        var mut = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            var $target = $(mutation.target);
            if ($target.hasClass('active')) {
              self.accessibility.liveRegion.announce($target.text(), 500);
            }
            if ($target.hasClass('selected') && !mutation.oldValue.match('selected')) {
              self.$dropdown_content.find('[aria-selected]').attr('aria-selected', 'false');
              setTimeout(function () {
                $target.attr('aria-selected', true);
              }, 0);
            }
          });
        });
        mut.observe(self.$dropdown[0], {
          attributeFilter: ['class'],
          subtree: true,
          attributeOldValue: true
        });

      },
      init: function (options) {
        self.accessibility.liveRegion.$region = $('<div>');
        self.accessibility.liveRegion.setAttributes();
        self.accessibility.liveRegion.setStyle();
        self.accessibility.liveRegion.eventsHandler();
        $('body').append(self.accessibility.liveRegion.$region);
      }
    }

    this.setup = (function () {
      var original = self.setup;
      return function () {
        original.apply(this, arguments);
        var id = self.accessibility.helpers.randomId();
        self.$control_input.attr({
          'role': 'combobox',
          'aria-owns': id,
          'aria-autocomplete': 'list',
          'aria-expanded': 'false',
          'aria-labelledby': 'country'
        });
        self.$dropdown_content.attr({
          'role': 'listbox',
          'id': id
        });
        self.accessibility.liveRegion.init();
      };
    })();
  });
})(jQuery, Selectize);

$('select').selectize({
  plugins: {
    'accessibility': {}
  },
  render: {
    option: function ($item, escape) {
      return `<div class="option" role="option" aria-selected="false">${$item.text}</div>`
    }
  }
});