import * as React from "react";
import { useEffect, useState } from "react";
import styled from 'styled-components'
import "./App.css";
import { TVChartContainer } from "./components/TVChartContainer/index";
import { Button, Empty, Input, Modal, notification } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { getPairs, tokenList } from "./datafeed/helpers";
import { getTokenSymbol, updateToValidSymbol } from "./datafeed/datafeed";
import { connect } from "react-redux";
import { actionsPairs } from "./redux/pairs-reducer";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import { CloseSquareOutlined } from "@ant-design/icons";

const App = ({ pairs, initPairs, isInitialized, addPair }) => {
  const location = useLocation();
  const [viewSearchModal, setViewSearchModal] = useState(false);
  const [chartsPair, setChartsPair] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPairs, setFilteredPairs] = useState(null);
  const [placeholder, setPlaceholder] = useState("Enter pair name");

  const onChange = (e) => {
    setSearchQuery(e.target.value.trim());
  };

  useEffect(() => {
    (async () => {
      const data = await getPairs();
      let allSymbols = [];
      const pairs = data.Data["Binance"].pairs;
      for (const leftPairPart of Object.keys(pairs)) {
        const symbols = pairs[leftPairPart].map(rightPairPart => {
          return {
            token0Symbol: updateToValidSymbol(leftPairPart),
            token1Symbol: updateToValidSymbol(rightPairPart)
          };
        });
        allSymbols = [...allSymbols, ...symbols];
      }
      allSymbols = allSymbols.filter(symbol => {
        const token1 = tokenList.find(token => symbol.token0Symbol === token.symbol);
        const token2 = tokenList.find(token => symbol.token1Symbol === token.symbol);
        return !!(token1 && token2);
      }).map(pair => {
        const token0Address = tokenList.find(token => pair.token0Symbol === token.symbol).address;
        const token1Address = tokenList.find(token => pair.token1Symbol === token.symbol).address;
        return {
          ...pair, token0Address, token1Address
        };
      });
      if (localStorage.getItem("customPairs")) {
        const localStoragePairs = JSON.parse(localStorage.getItem("customPairs"));
        allSymbols = [...allSymbols, ...localStoragePairs];
      }
      initPairs(allSymbols);
      setFilteredPairs(allSymbols);
    })();
  }, []);
  useEffect(() => {
    if (isInitialized && location.pathname && location.search) {
      const [token0Address, token1Address] = [location.pathname.split("=")[1].trim(), location.search.split("=")[1].trim()];
      const pairInfo = pairs.find(pair => pair.token0Address === token0Address && pair.token1Address === token1Address);
      setPlaceholder(`${pairInfo.token0Symbol}/${pairInfo.token1Symbol}`);
      setChartsPair(pairInfo);
    }
  }, [location.pathname, location.search, isInitialized]);
  useEffect(() => {
    if (filteredPairs) {
      if (new RegExp("0x\\w+", "i").test(searchQuery)) {
        (async () => {
          if (/^0x[a-fA-F0-9]{40}$/.test(searchQuery)) {
            const wbnb = tokenList.find(token => token.symbol === "WBNB");
            const symbolSearch = await getTokenSymbol(searchQuery);
            const twoPairs = [
              {
                token0Symbol: wbnb.symbol,
                token1Symbol: symbolSearch,
                token0Address: wbnb.address,
                token1Address: searchQuery
              },
              {
                token0Symbol: symbolSearch,
                token1Symbol: wbnb.symbol,
                token0Address: searchQuery,
                token1Address: wbnb.address
              }
            ];

            if (localStorage.getItem("customPairs")) {
              const previousPairs = JSON.parse(localStorage.getItem("customPairs"));
              const isFirstExist = !!previousPairs.find(pair => pair.token0Address.toLowerCase() === twoPairs[0].token0Address.toLowerCase() &&
                pair.token1Address.toLowerCase() === twoPairs[0].token1Address.toLowerCase());
              const isSecondExist = !!previousPairs.find(pair => pair.token0Address.toLowerCase() === twoPairs[1].token0Address.toLowerCase() &&
                pair.token1Address.toLowerCase() === twoPairs[1].token1Address.toLowerCase());
              const twoPairsForLS = twoPairs.filter((pair, index) => {
                return (index == 0 && !isFirstExist) || (index == 1 && !isSecondExist);
              });
              twoPairsForLS.forEach(item => addPair(item));
              localStorage.removeItem("customPairs");
              localStorage.setItem("customPairs", JSON.stringify([...previousPairs, ...twoPairsForLS]));
            }else{
              addPair(twoPairs[0])
              addPair(twoPairs[1])
              localStorage.setItem("customPairs", JSON.stringify([...twoPairs]));
            }
            setFilteredPairs(twoPairs);
          }
        })();
      } else {
        const filteredMiddleware = pairs.filter(pair => new RegExp(searchQuery, "i").test(`${pair.token0Symbol}/${pair.token1Symbol}`));
        setFilteredPairs(filteredMiddleware);
      }
    }
  }, [searchQuery]);

  const SearchInputContainer = styled.div`
    position: relative;
    width: 500px;

    @media (max-width: 500px) {
      width: 95vw;
    }
  `
  const SearchInput = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `
  const SearchContainer = styled.div`
    width: 500px;
    height: 400px;
    overflow-y: scroll;
    padding: 10px;
    border: 1px #989392 solid;
    position: absolute;
    left: 0;
    top: 100%;
    background: #EEEAE7;
    borderRadius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0px 0 10px 10px;
    justify-сontent: ${filteredPairs?.length !== 0 ? "unset" : "center"};

    @media (max-width: 500px) {
      width: 95vw;
    }
  `
  const SearchItem = styled.div`
    width: 100%;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
  `

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setViewSearchModal(false);
    setIsModalVisible(true);
    setFirstTokenAddress(searchQuery);
    setSearchQuery("");
  };

  const handleOk = async () => {
    if (firstTokenAddress.toLowerCase() === secondTokenAddress.toLowerCase()) return;
    const isExistingPair = pairs.find(pair => {
      return pair.token0Address.toLowerCase() === firstTokenAddress.toLowerCase() &&
        pair.token1Address.toLowerCase() === secondTokenAddress.toLowerCase();
    });
    if (isExistingPair) {
      notification.info({
        message: "Already exist",
        description:
          "Pair is already exist."
      });
      setIsModalVisible(false);
      setFirstTokenAddress("");
      setSecondTokenAddress("");
      return;
    }

    if (/^0x[a-fA-F0-9]{40}$/.test(firstTokenAddress) && /^0x[a-fA-F0-9]{40}$/.test(secondTokenAddress)) {
      setConfirmLoading(true);
      let symbols;
      try {
        symbols = await Promise.all([getTokenSymbol(firstTokenAddress), getTokenSymbol(secondTokenAddress)]);
        console.log("");
      } catch (e) {
        notification.error({
          message: "Ops...",
          description:
            "We didn't find a pair."
        });
        setConfirmLoading(false);
        return;
      }
      const [token0Symbol, token1Symbol] = symbols;
      if (localStorage.getItem("customPairs")) {
        const previousPairs = JSON.parse(localStorage.getItem("customPairs"));
        localStorage.removeItem("customPairs");
        localStorage.setItem("customPairs", JSON.stringify([...previousPairs, {
          token0Symbol,
          token1Symbol,
          token0Address: firstTokenAddress,
          token1Address: secondTokenAddress
        }]));
      } else {
        localStorage.setItem("customPairs", JSON.stringify([{
          token0Symbol,
          token1Symbol,
          token0Address: firstTokenAddress,
          token1Address: secondTokenAddress
        }]));
      }
      addPair({
        token0Symbol,
        token1Symbol,
        token0Address: firstTokenAddress,
        token1Address: secondTokenAddress
      });
      setConfirmLoading(false);
      setIsModalVisible(false);
      setFirstTokenAddress("");
      setSecondTokenAddress("");
    } else {
      notification.error({
        message: "Invalid Address",
        description:
          "Please enter valid tokens addresses."
      });
      return;
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFirstTokenAddress("");
    setSecondTokenAddress("");
  };
  const [firstTokenAddress, setFirstTokenAddress] = useState("");
  const [secondTokenAddress, setSecondTokenAddress] = useState("");

  return (
    <div className={"App"}>

      <Modal title="Add pair" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
             confirmLoading={confirmLoading}>
        <Input placeholder="Enter first token address" allowClear
               onChange={(e) => setFirstTokenAddress(e.target.value.trim())}
               value={firstTokenAddress} />
        <br />
        <br />
        <Input placeholder="Enter second token address" allowClear
               onChange={(e) => setSecondTokenAddress(e.target.value.trim())}
               value={secondTokenAddress} />
      </Modal>

      <header>
        <SearchInputContainer>

          <SearchInput >
            <Input size="large" placeholder={placeholder} prefix={<SearchOutlined />} value={searchQuery}
                   onChange={onChange} showSearch onFocus={() => setViewSearchModal(true)} />
            {viewSearchModal && <CloseSquareOutlined style={{ fontSize: "20px", cursor: "pointer", color: "white" }}
                                                     onClick={() => {
                                                       setViewSearchModal(false);
                                                       setSearchQuery("");
                                                     }} />}
          </SearchInput>

          {viewSearchModal && <SearchContainer>
            {filteredPairs && filteredPairs.length !== 0 && filteredPairs.map(pair => (
              <NavLink to={`/token0Id=${pair.token0Address}?token1Id=${pair.token1Address}`} style={{ width: "100%" }}
                       onClick={() => {
                         setViewSearchModal(false);
                         setSearchQuery("");
                       }}>
                <SearchItem>
                  <div>{`${pair.token0Symbol}/${pair.token1Symbol}`}</div>
                </SearchItem>
              </NavLink>
            ))}

            {filteredPairs.length === 0 && (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60
                }}
                description={
                  <span>
                    We didn't find such a pair in this list.
                  </span>
                }
              >
                <Button type="primary" onClick={showModal}>Add new pair now</Button>
              </Empty>
            )}

          </SearchContainer>}
        </SearchInputContainer >
      </header>
      <TVChartContainer pair={chartsPair} />
    </div>
  );
};

const MapStateToProps = (state) => ({
  pairs: state.pairs.pairs,
  isInitialized: state.pairs.isInitialized
});

export default connect(MapStateToProps, { initPairs: actionsPairs.initPairs, addPair: actionsPairs.addPair })(App);