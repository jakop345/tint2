module.exports = (function() {
  var $ = process.bridge.objc;
  var TextInput = require('TextInput');

  /**
   * @class SelectInput
   * @description The Select Input creates a combo box where a user can input text similar to TextInput
   *              but can be "pulled down" to see a list of options as well. This class inherits TextInput
   *              classes functionality, see TextInput for more information.
   * @see TextInput
   * @extends TextInput
   */
  /**
   * @new 
   * @memberof SelectInput
   * @description Creates a new SelectInput control.
   */
  function SelectInput(NativeObjectClass, NativeViewClass, options) {
    options = options || {};
    options.delegates = options.delegates || [];
    options.delegates = options.delegates.concat([
      ['comboBoxSelectionDidChange:','v@:@', function(self,_cmd,frame) { this.fireEvent('change');  }.bind(this)]
    ]);

    if(NativeObjectClass && NativeObjectClass.type == '#')
      TextInput.call(this, NativeObjectClass, NativeViewClass, options);
    else
      TextInput.call(this, $.NSComboBox, $.NSComboBox, options);
  }

  SelectInput.prototype = Object.create(TextInput.prototype);
  SelectInput.prototype.constructor = SelectInput;

  Object.defineProperty(SelectInput.prototype, 'value', {
    get:function() {
      if(this.selectedIndex == -1) return this.nativeView('stringValue')('UTF8String'); 
      else return this.nativeView('itemObjectValueAtIndex',this.nativeView('indexOfSelectedItem'));
    },
    set:function(e) { this.nativeView('setStringValue',$(e)); }
  });

  /**
   * @member selectedIndex
   * @type {number}
   * @memberof SelectInput
   * @description Gets or sets the selected item from the options available.
   */
  Object.defineProperty(SelectInput.prototype, 'selectedIndex', {
    get:function() { return this.nativeView('indexOfSelectedItem'); },
    set:function(e) { this.nativeView('selectItemAtIndex', e); }
  });

  /**
   * @member length
   * @type {number}
   * @memberof SelectInput
   * @description Gets the amount of options currently on the select input.
   */
  Object.defineProperty(SelectInput.prototype, 'length', { get:function() { return this.nativeView('numberOfItems'); } });

  /**
   * @method addItem
   * @params {string} option The text title of the option the user may select.
   * @memberof SelectInput
   * @description Adds an item to the select input as an option, this is added to the end of the options list.
   */
  SelectInput.prototype.addItem = function(item) { this.nativeView('addItemWithObjectValue',$(item)); }

  /**
   * @method addItemAtIndex
   * @params {string} option The text title of the option the user may select.
   * @params {number} index The index (from 0 to length-1) of where to add the option.
   * @memberof SelectInput
   * @description Adds an item to the select input as an option, the item is inserted at the index.
   */
  SelectInput.prototype.addItemAtIndex = function(item, index) { this.nativeView('insertItemWithObjectValue',$(item),'atIndex',index); }

  /**
   * @method removeItemAtIndex
   * @params {number} index The index (from 0 to length-1) of the item to remove.
   * @memberof SelectInput
   * @description Removes the item at the specified index.
   */
  SelectInput.prototype.removeItemAtIndex = function(index) { this.nativeView('removeItemAtIndex', index); }


  /**
   * @method removeItem
   * @params {string} option The text title of the option to be removed.
   * @memberof SelectInput
   * @description Removes the option where the text title matches the passed in value.
   */
  SelectInput.prototype.removeItem = function(item) { this.nativeView('removeItemWithObjectValuel',$(item));  }

  /**
   * @method item
   * @params {number} index The index used to get the items information.
   * @returns {string}
   * @memberof SelectInput
   * @description Returns the text title for the item at the specified index.
   */
  SelectInput.prototype.item = function(index) { return this.nativeView('itemObjectValueAtIndex',index); }

  return SelectInput;
})();