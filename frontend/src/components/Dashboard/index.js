import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter, useLocation } from "react-router";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './dashboard.scss';
import './tabCryptos.scss';
import './tabPortfolio.scss';
import './tabOrder.scss';
import Crypto from './Crypto';
import Order from './Order';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { displayCryptos: '__actived', displayOrders: '', displayPortfolio: '' };
  }

  componentDidMount() {
    const { manageLoad, username } = this.props;
    if (this.props.match.params.slug != username) {
      this.setState({ slugUser: this.props.match.params.slug })
      manageLoad(this.props.match.params.slug);
    } else {
      manageLoad(username);
      this.setState({ slugUser: username })
    }
  }
  componentWillUnmount() {
    this.props.resetLoading();
  }
  render() {
    const {
      loadingHisPortfolio,
      loadingHisCryptos,
      loadingHisOrders,
      loadingHisRank,
      hisCryptos,
      hisOrders,
      hisPortfolio,
      hisRank,
      username,
      handleClickTab,
      displayCryptos,
      displayOrders,
      displayPortfolio,
      toOrder,
      theme,
    } = this.props;
    const colorGraph = theme ? '#fff' : '#181c27';
    let loading = true;
    const amountCrypto = [];
    const labelCrypto = [];
    const portfolioDate = [];
    const portfolioAmount = [];
    if (
      loadingHisPortfolio === false
      && loadingHisCryptos === false
      && loadingHisOrders === false
      && loadingHisRank === false
    ) {
      loading = false;
      if (hisCryptos != null) {
        hisCryptos.forEach(crypto => {
          const amount = crypto.actualQuantity * crypto.realTimePrice
          amountCrypto.push(amount);
          labelCrypto.push(crypto.symbol);
        });
      }
      if (hisPortfolio != null) {
        hisPortfolio.forEach(value => {
          const amoutAround = Math.round(value.valorisation);
          portfolioDate.push(value.date);
          portfolioAmount.push(amoutAround);
        })
      }
    }
    const graphCryptos = {
      chart: {
        type: 'donut',
      },
      title: {
        text: 'Valeur en USDT'
      },
      labels: labelCrypto,
      theme: {
        monochrome: {
          color: '#1b944c',
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 350
          },
        }
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            width: 450
          },
        }
      },
      {
        breakpoint: 700,
        options: {
          chart: {
            width: 480
          },
        }
      },
      {
        breakpoint: 1500,
        options: {
          chart: {
            width: 500
          },
        }
      },
      {
        breakpoint: 1600,
        options: {
          chart: {
            width: 600
          },
        }
      }
      ],
    }
    const graphPortfolio = {
      series: [{
        name: 'Montant',
        data: portfolioAmount
      }],
      options: {
        legende: {
          show: false
        },
        chart: {
          height: 500,
          type: 'bar',
        },
        theme: {
          monochrome: {
            color: '#4fdb88',
            enabled: true
          }
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        tooltip: {
          enabled: true,
          style: {
            color: "#000",
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + " $";
          },
          hideOverflowingLabels: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#4fdb88"],
          },
        },
        xaxis: {
          categories: portfolioDate,
          position: 'top',
          labels: {
            style: {
              color: ['#fff'],
              fontSize: '14px',
              cssClass: ".dateGraph"
            },
          },
          tooltip: {
            enabled: true,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: true,
            formatter: function (val) {
              return val + "$";
            }
          }

        },
        title: {
          text: 'Evolution quotidienne de la valorisation',
          floating: true,
          offsetY: 610,
          align: 'center',
          style: {
            fontSize: "1.2rem",
            color: colorGraph
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
          }
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width: 450
            },
          }
        },
        {
          breakpoint: 700,
          options: {
            chart: {
              width: 600
            },
          }
        },
        {
          breakpoint: 900,
          options: {
            chart: {
              width: 700
            },
          }
        },
        {
          breakpoint: 1000,
          options: {
            chart: {
              width: 800
            },
          }
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: 900
            },
          }
        }
        ],
      }
    }
    return (
      <div className="dashboard" >
        {
          username === this.props.match.params.slug
            ? <h2 className="dashboard__title">Bienvenue sur votre dashboard {username}</h2>
            : <h2 className="dashboard__title">Dashboard de {this.state.slugUser}</h2>
        }
        { loading && <div className="cryptos__waitLoadding">
          <FontAwesomeIcon
            size="5x"
            color="#4fdb88"
            icon={faSpinner}
            spin
          />
        </div>}
        {!loading && (
          <>
            <div className="dashboard__onglet" >
              <button
                className={`dashboard__onglet-cryptos buttonOnglet${displayCryptos}`}
                onClick={() => handleClickTab('cryptos')}
              >
                {
                  username === this.props.match.params.slug
                    ? 'Mes Cryptos'
                    : 'Ses cryptos'
                }
              </button>
              <button
                className={`dashboard__onglet-portfolio buttonOnglet${displayPortfolio}`}
                onClick={() => handleClickTab('portfolio')}
              >
                {
                  username === this.props.match.params.slug
                    ? 'Mon évolution'
                    : 'Son évolution'
                }
              </button>
              <button
                className={`dashboard__onglet-orders buttonOnglet${displayOrders}`}
                onClick={() => handleClickTab('orders')}
              >
                {
                  username === this.props.match.params.slug
                    ? 'Mes ordres'
                    : 'Ses ordres'
                }
              </button>
            </div>
            <div className={`hisCryptos${displayCryptos} hisCryptos`}>
              <div className="hisCryptos__table">
                <div className="hisCrypto headerTableCryptos">
                  <div className="hisCrypto__logo">Nom</div>
                  <div className="hisCrypto__quantity">Quantité</div>
                  <div className="hisCrypto__buyingPrice">Prix actuel</div>
                  <div className="hisCrypto__valuation">Valorisation</div>
                  <div className="hisCrypto__percent">Gains/Pertes</div>

                </div>
                {
                  hisCryptos != null ?
                    hisCryptos.map((crypto) => (
                      <Crypto
                        key={crypto.pairName}
                        toOrder={toOrder}
                        {...crypto}
                      />
                    ))
                    : <div>Vous n'avez pas de crypto</div>
                }
              </div>
              <div className="hisCryptos__graph">
                <ReactApexChart
                  options={graphCryptos}
                  series={amountCrypto}
                  type="donut"
                  width="700"
                />
              </div>
            </div>
            <div className={`hisOrders${displayOrders}`}>
              <div className="hisOrders__table">
                <div className="hisOrder headerTableOrders">
                  <div className="hisOrder__createdAt">Date</div>
                  <div className="hisOrder__name">Nom</div>
                  <div className="hisOrder__type">Type</div>
                  <div className="hisOrder__quantity">Quantité</div>
                  <div className="hisOrder__quotation">Cotation</div>
                  <div className="hisOrder__amount">Montant</div>
                </div>
                {
                  hisOrders.length > 0 ?
                    hisOrders.map((order) => (
                      <Order
                        key={order.createdAt}
                        {...order}
                      />
                    ))
                    :
                    <div>Vous n'avez pas passé d'ordre</div>
                }
              </div>

            </div>
            <div className={`hisPortfolio${displayPortfolio}`}>
              <h3 className="hisPortfolio__title">
                {`Position dans le classement : n°${hisRank}`}
              </h3>
              <ReactApexChart
                options={graphPortfolio.options}
                series={graphPortfolio.series}
                type="bar"
                width="1000"
              />
            </div>
          </>

        )
        }

      </div>
    );
  }
}
export default withRouter(Dashboard);
