import * as React from "react";
import "./index.css";
import { widget } from "../../charting_library";
import Datafeed from "../../datafeed/datafeed";

function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? null
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export class TVChartContainer extends React.PureComponent {
  static defaultProps = {
    symbol: "DogeCharts:ADA/WBNB",
    interval: "15",
    containerId: "tv_chart_container",
    libraryPath: "/charting_library/",
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    theme: "Dark",
  };

  tvWidget = null;

  componentDidMount() {
    const widgetOptions = {
      symbol: this.props.pair? `DogeCharts:${this.props.pair.token0Symbol}/${this.props.pair.token1Symbol}`:this.props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: Datafeed,
      interval: this.props.interval,
      container: this.props.containerId,
      library_path: this.props.libraryPath,

      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings", "header_symbol_search"],
      enabled_features: ["study_templates"],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      theme: this.props.theme,
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
    const widgetOptions = {
      symbol: this.props.pair? `DogeCharts:${this.props.pair.token0Symbol}/${this.props.pair.token1Symbol}`:this.props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: Datafeed,
      interval: this.props.interval,
      container: this.props.containerId,
      library_path: this.props.libraryPath,

      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings", "header_symbol_search"],
      enabled_features: ["study_templates"],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      theme: this.props.theme,
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return <div id={this.props.containerId} className={"TVChartContainer"} />;
  }
}
