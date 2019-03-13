import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
// import url from '../../../config';

class BestSellers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData: []
    };
    this.getData = this.getData.bind(this);
    this.configureRating = this.configureRating.bind(this);
  }

  componentDidMount(){
    // console.log('hello')
    console.log(window.location.href)
    const itemId = window.location.href.split("/")[3];
    this.getData(itemId);
  }

  configureRating(rating) {
    var ratingAmnt = parseFloat(rating)
    if (ratingAmnt > 89) {
      return 'rating-5.png'
    } else if (ratingAmnt <= 80 && ratingAmnt >= 61) {
      return 'rating-4.png'
    } else {
      return 'rating-3';
    }
  }

  getData(itemId) {
    axios.get(`/api/product/${itemId}`)
  
    .then((data) => {
      
      console.log(data.data);
      this.setState({
        productData: data.data.competitors
      })
      //console.log(data.data[0].onList)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="best-sellers">
        <h2 className="header">
          Best Sellers
        </h2>
        <ul className="sellers-list">
          {this.state.productData.map((items, key) => {
            return (
              <div>
              <li className={"sellers-list-item"+key}>
            <div className="store-fix">
              <div className="item-seller">
                <a href="#" className="noLine">{items.companyName}</a>
                <p className="seller-list-rating">
                  <i className="rating">
                    <img src={`/assets/${this.configureRating(items.reviewScore)}`} alt=""/>
                  </i>
                  <span>
                    <span className="rating-views-num">
                      {items.numReviews} reviews
                    </span>
                    <span className="rating-views-percent">
                      ({items.reviewScore} % Positive)
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div className="detail">
            <div className="landing-page-seller-button">
                <button className="btn-for-seller">
                  <span>VIEW DETAILS</span>
                </button>
              </div>
              <ul className="price-info">
                <li className="price-current-seller">
                  $ <strong>{items.price.toString().split('.')[0]}</strong>
                  <sup>.{items.price.toString().split('.')[1]}</sup>
                </li>
                <li className="price-ship-seller">
                  <span className="is-normal">
                    <span>+ $3.99 Shipping</span>
                  </span>
                </li>
                


          
              </ul>
            </div>
          </li>
          <div className={"modal"+key}>
                  <div className="popover-body">
                    <div className="popover-sold-by">
                      Sold and Shipped by: {items.companyName}
                    </div>
                    <p></p>
                    <div className="popover-ships-from">
                      <span className="shipping-from">
                        Ships from {items.country}
                      </span>
                    </div>
                    <div className="rating-views-head">
                      <a href="#" className="rating-views-head-link">
                        <i className="rating-4">

                        </i>
                        <span className="rating-views-num">{items.numReviews} reviews</span>
                        <span className="rating-views-percent">({items.reviewScore}% positive)</span>
                      </a>
                    </div>
                    <div className="market-text-view">
                      <div className="market-text-view-title">ON-TIME </div>
                      <div className="market-text-view-subtitle">DELIVERY </div>
                      <div className="market-text-view-count">
                        {items.deliveryPcnt.toString().split('.')[0]}
                        <sup>.{items.deliveryPcnt.toString().split('.')[1]}</sup>
                        <span className="market-text-view-mark">%</span>
                      </div>
                    </div>
                    <div className="market-text-view">
                      <div className="market-text-view-title">PRODUCT </div>
                      <div className="market-text-view-subtitle">ACCURACY </div>
                      <div className="market-text-view-count">
                      {items.productPcnt.toString().split('.')[0]}
                      <sup>.{items.productPcnt.toString().split('.')[1]}</sup>
                        <span className="market-text-view-mark">%</span>
                      </div>
                    </div>
                    <div className="market-text-view">
                      <div className="market-text-view-title">CUSTOMER SERVICE </div>
                      <div className="market-text-view-subtitle">SATISFACTION </div>
                      <div className="market-text-view-count">
                      {items.servicePcnt.toString().split('.')[0]}
                      <sup>.{items.servicePcnt.toString().split('.')[1]}</sup>
                        <span className="market-text-view-mark">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            );
          })}
          <li className="lowest-offer">
            <a href="#" className="lowest-offer-link">Compare Offers for as low as $95.77</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default BestSellers;