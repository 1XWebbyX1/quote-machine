var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}
//REACT__________________________________________________________________--


//QUOTE CARD WITH QUOTE______________________________________________________
var Card = function (_React$Component) {_inherits(Card, _React$Component);
  function Card(props) {_classCallCheck(this, Card);var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this,
    props));
    _this.copyText = _this.copyText.bind(_this);return _this;
  }

  //copy Quote-------------------------------------
  _createClass(Card, [{ key: "copyText", value: function copyText() {
      var copyText = document.getElementById("text");
      var $temp = $("<input>"); //create temporary input 
      $("body").append($temp); //append it to document body
      $temp.val($(copyText).text()).select(); //copy the quote and append to input , then select the text
      document.execCommand("copy"); //copy the selected text
      $temp.remove(); //remove the temporary input
      $('.tooltiptext').css({ visibility: 'visible', opacity: 1 }); //display copied tooltip text

      //hide tooltip after 1s
      setTimeout(function () {
        $('.tooltiptext').css({ visibility: 'hidden', opacity: 0 });
      }, 1000);
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement("div", { className: "card" },
          React.createElement("div", { id: "Q" }, "Q"),
          React.createElement("div", { id: "text" }, "Too many of us are not living our dreams because we are living our fears."),

          React.createElement("div", { id: "subs" },
            React.createElement("i", { id: "copy-quote", "class": "fa fa-clipboard faa-tada animated-hover", onClick: this.copyText, "aria-hidden": "true" }), React.createElement("span", { "class": "tooltiptext" }, "Copied!"),
            React.createElement("div", { id: "author" }, "Les Brown")),

          React.createElement("button", { id: "new-quote" }, "New  Quote")));


    } }]);return Card;}(React.Component);

//----------------------------------------------------------------------------

//Wrapper for quote card___________________________________________________
var Wrapper = function (_React$Component2) {_inherits(Wrapper, _React$Component2);function Wrapper() {_classCallCheck(this, Wrapper);return _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));}_createClass(Wrapper, [{ key: "render", value: function render()
    {
      return (
        React.createElement("div", { className: "card-wrapper" },
          React.createElement(Card, null)));


    } }]);return Wrapper;}(React.Component);

//------------------------------------------------------------------------

//Container for quote box_________________________________________________
var Container = function (_React$Component3) {_inherits(Container, _React$Component3);function Container() {_classCallCheck(this, Container);return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));}_createClass(Container, [{ key: "render", value: function render()
    {
      return (
        React.createElement("div", null,
          React.createElement("div", { id: "container" },
            React.createElement(Wrapper, { id: "quote-box" }))));



    } }]);return Container;}(React.Component);

//--------------------------------------------------------------------------


//render the app ____________________________________________________________________
ReactDOM.render(React.createElement(Container, null), document.getElementById("app"));



//jQuery and Ajax for api calls_______________________________________________________
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('new-quote').onclick = function () {
    //making request to database--------
    req = new XMLHttpRequest();
    req.open('GET', 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', true);
    req.send();
    currentQuote = '';
    //processing data retreived--------------
    req.onload = function () {
      json = JSON.parse(req.responseText);
      quotesData = json.quotes;
      randomQuote = quotesData[Math.floor(Math.random() * quotesData.length)];
      currentQuote = randomQuote.quote;
      currentAuthor = randomQuote.author;
    };
    //animation and setting new quote---------------------------------------
    $("#text, #author, #copy-quote, .card-wrapper").animate(
    { opacity: 0 },
    2000,
    function () {
      $(this).animate({ opacity: 1 }, 2000);
      if (currentQuote == '') {
        $('#subs, #Q, #new-quote').css({ opacity: 0 });
        error = 'Oops! An error has occured ☹️.Please reload the page and try again.';
        $('#text').text(error);
      } else
      {
        $('#text').text(currentQuote);
        $('#author').html(currentAuthor);
      }

    });



    //disable the button during change----------------------------------
    document.getElementById('new-quote').disabled = true;

    //reenable the button after animation------------------------------
    setTimeout(function () {
      document.getElementById('new-quote').disabled = false;
    }, 4000);


  };
});