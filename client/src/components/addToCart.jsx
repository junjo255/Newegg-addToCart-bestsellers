import React from "react";
import axios from 'axios';
import url from '../../../config'

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      onList: 0,
      priceProduct: 0,
      originalPrice: 0,
      savedCash: 0,
      savedPcnt: 0,
      wishlists: 0
    };
    this.getData = this.getData.bind(this);
    this.handleQtyClickPlus = this.handleQtyClickPlus.bind(this);
    this.handleQtyClickSub = this.handleQtyClickSub.bind(this);
  }

  componentDidMount(){
    
    // console.log(window.location.href, "what is this one")
    const itemId = window.location.href.split("/")[3];
    this.getData(itemId);
  } 

  handleQtyClickPlus() {
    var newQty = this.state.qty += 1
    this.setState({
      qty: newQty
    })
  }

  handleQtyClickSub() {
    if (this.state.qty !== 1) {
      var newQty = this.state.qty -= 1
      this.setState({
        qty: newQty
      })
    }
  }

  getData(itemId) {
    // console.log(window.location.href.split('/')[3], "is this working?")
    // var x = window.location.href.split('/')[3]
    // if (x === '') {
    //   x = '5c88089307275338dceacf36';
    // }

    // ${url.url}/api/items/${x}

    axios.get(`/api/product/${itemId}`)
    .then((data) => {
      console.log(data.data.onlist);
      
      this.setState({
        wishlists: data.data.onlist,
        priceProduct: data.data.priceproduct,
        originalPrice: data.data.originalprice,
        savedCash: data.data.savedcash,
        savedPcnt: data.data.savedpcnt
      })
      //console.log(data.data[0].onList)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="cart">
        <div className="newegg-seller-info-lpPrimary">
          <div className="mktProdOpts">
            <div className="featured-seller">
              <div className="label">
                <span>Sold and Shipped by: </span>
                <strong>Newegg</strong>
              </div>
            </div>
            <ul className="price-info">
              <li className="price-was">
                ${this.state.originalPrice}
              </li>
              <li className="price-current">
                $ <strong>{this.state.priceProduct.toString().split('.')[0]}
                </strong>
                <sup>.{this.state.priceProduct.toString().split('.')[1]}
                </sup>
              </li>
              <li className="price-save">
                <span className="price-save-label">
                  Save: 
                </span>
                <span className="price-save-dollar">
                  <span> ${this.state.savedCash} </span>
                  <span> </span>
                </span>
                <span className="price-save-percent">
                  <span>(</span>
                  <span>{this.state.savedPcnt}</span>
                  <span>%)</span>
                </span>
              </li>
              <li className="price-ship">
                    <span>$3.99 Shipping</span>
                    <span> </span>
                    <span className="note">
                      <span>(</span>
                      <a href="#">restrictions apply</a>
                      <span>)</span>
                    </span>
              </li>
            </ul>
          </div>
        </div>
        {/* LANDING CART HERE */}




        <div id="landingpage-cart">
          <div className="nav-row">
            <div className="nav-col">
              <div className="qty-box">
                <input type="text" maxLength="3" className="qty-field"
                value={this.state.qty}/>

                <div className="qty-button">

                <button className="qty-box-plus"
                onClick={this.handleQtyClickPlus}>
                  <span className="hid-text"><strong>+</strong></span>
                </button>
                <button className="qty-box-sub"
                onClick={this.handleQtyClickSub}>
                  <span className="hid-text"><strong>-</strong></span>
                </button>
                </div>
              </div>
              <div className="nav-col">
                <button className="btn-add-to-cart">
                  <span> ADD TO CART</span>
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* LANDING CART HERE */}
        <ul className="secondary">
          <li className="item-compare-box">
            <label className="btn-form-checkbox">
              <input type="checkbox" className="compare-item"/>
              <span className="form-checkbox-title">Add To Compare</span>
            </label>
          </li>
          <li className="item-alert">
            <a href="#" className="btn-alert">
              Price Alert
            </a>
          </li>
          <li className="item-wishlist">
            <a href="#" className="wishlist-btn">
              Add to Wishlist
            </a>
            <span className="item-wishlist-num">
              Found on <strong> {this.state.wishlists}
              </strong>
               wishlists
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

export default AddToCart;