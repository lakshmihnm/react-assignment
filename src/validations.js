function ValidationCellEditor() {}

var TICK_SYMBOL = '&#10004';
var CROSS_SYMBOL = '&#10005';

ValidationCellEditor.prototype.init = function(params) {
  alert('validation');
  this.isValid = true;
  this.isValidating = false;
  
  this.eGui = document.createElement('div');
  this.eGui.innerHTML = `
    <input value=${params.value} />
    <span class="validating-msg hide">Validating...</span>
    <span class="validating-result hide"><span>
  `;
  this.eInput = this.eGui.querySelector('input');
  this.eValidating = this.eGui.querySelector('.validating-msg');
  this.eResult = this.eGui.querySelector('.validating-result');
  this.eInput.addEventListener('input', this.inputChanged.bind(this));
}

ValidationCellEditor.prototype.inputChanged = function(event) {
  this.showValidatingMessage(true);
  this.isValidating = true;
  this.eResult.classList.add('hide');
  this.validate(event.target.value).then(valid => {
    this.isValid = valid;
    this.isValidating = false;
    this.showValidatingMessage(false);
    this.showValidationResult(valid);
  });
}

ValidationCellEditor.prototype.validate = async function(value) {
  // Simulate awaiting the result of an api call to validate
  // Replace this with your validation logic
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(value.length === 6);
    }, 2000);
  });
}

ValidationCellEditor.prototype.showValidationResult = function(valid) {
  this.eResult.classList.remove('hide');
  if(valid) {
    this.eResult.innerHTML = TICK_SYMBOL;
  } else {
    this.eResult.innerHTML = CROSS_SYMBOL;
  }
}

ValidationCellEditor.prototype.showValidatingMessage = function(show) {
  if(show) {
    this.eValidating.classList.remove('hide');
  } else {
    this.eValidating.classList.add('hide');
  }
}

ValidationCellEditor.prototype.isCancelAfterEnd = function() {
  return !this.isValid || this.isValidating;
}

ValidationCellEditor.prototype.getValue = function() {
  return this.eInput.value;
}

ValidationCellEditor.prototype.getGui = function() {
  return this.eGui;
}

ValidationCellEditor.prototype.destroy = function() {
  this.eInput.removeEventListener('input', this.inputChanged);
}