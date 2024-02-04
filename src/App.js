import "./App.scss";
import { useState, useRef, useEffect } from "react";
import { cards } from "./app_data/cardItems";
import { cardFeatures } from "./app_data/cardFeatures";
import classNames from "classnames";

import CardBalance from "./components/CardBalance/CardBalance";
import TabSelection from "./components/TabSelection/TabSelection";
import CardContainer from "./components/CardContainer/CardContainer";
import Footer from "./components/Footer/Footer";
import CardSummary from "./components/CardSummary/CardSummary";

function App() {
    const [cardItems, setCardItems] = useState(cards);
    const [cardFeaturesData, setCardFeaturesData] = useState([...cardFeatures]);
    const [selectedCardItem, setSelectedCardItem] = useState(cards[0]);
    const [showForm, setShowForm] = useState(false);
    const [cardItemIndex, setCardItemIndex] = useState(0);
    const cardContainerRef = useRef(null);

    const moveCardItemCarousel = (clickedCardItemIndex, cardItem) => {
        setSelectedCardItem(cardItem);
        setCardItemIndex(clickedCardItemIndex);

        const modifiedArray = cardFeaturesData.map((feature) => {
            if (feature.action === "freeze") {
                return {
                    ...feature,
                    name: cardItem.isCardFreezed
                        ? "Unfreeze Card"
                        : "Freeze Card",
                };
            }
            return { ...feature };
        });
        setCardFeaturesData(modifiedArray);

        let width = cardContainerRef.current.clientWidth;
        if (cardItemIndex < clickedCardItemIndex) {
            cardContainerRef.current.scrollLeft =
                clickedCardItemIndex === cardItemIndex + 1
                    ? cardContainerRef.current.scrollLeft + width
                    : cardContainerRef.current.scrollLeft +
                      width * +(clickedCardItemIndex - cardItemIndex);
        } else if (cardItemIndex > clickedCardItemIndex) {
            cardContainerRef.current.scrollLeft =
                clickedCardItemIndex === cardItemIndex - 1
                    ? cardContainerRef.current.scrollLeft - width
                    : cardContainerRef.current.scrollLeft +
                      width * (clickedCardItemIndex - cardItemIndex);
        }
    };

    const onActionClick = (payload) => {
        switch (payload.cardAction.action) {
            case "freeze": {
                const modifiedArray = cardFeaturesData.map((feature) => {
                    if (feature.action === "freeze") {
                        return {
                            ...feature,
                            name:
                                "Freeze Card" === payload.cardAction.name
                                    ? "Unfreeze Card"
                                    : "Freeze Card",
                        };
                    }
                    return { ...feature };
                });
                setCardFeaturesData(modifiedArray);

                const updatedCards = cardItems.map((card) => {
                    if (card.id === payload.item.id) {
                        return { ...card, isCardFreezed: !card.isCardFreezed };
                    }
                    return { ...card };
                });
                setCardItems(updatedCards);
                break;
            }
            case "cancel": {
                const modifiedArray = cardItems.filter(
                    (card) => card.id !== payload.item.id
                );
                setCardItems(modifiedArray);
                break;
            }
            default:
                return;
        }
    };

    const showCardNumberHandler = (payload) => {
        const updatedCards = cardItems.map((card) => {
            if (card.id === payload) {
                return { ...card, showCardNumber: !card.showCardNumber };
            }
            return { ...card };
        });
        setCardItems(updatedCards);
        // setSelectedCardItem((prevState)=> {
        //     return{...prevState, showCardNumber: !prevState.showCardNumber }
        // })
    };

    const addNewCardHandler = (payload) => {
        const cardNum = [];
        for (let i = 0; i < 4; i++) {
            cardNum.push(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));
        }
        const newCardObject = {
            id: Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
            name: "Aspire",
            logo: `<svg xmlns="http://www.w3.org/2000/svg" width="74" height="21" viewBox="0 0 74 21"><defs><style>.a{fill:#fff;}</style></defs><g transform="translate(0)"><path class="a" d="M10.564,21l-.158,0a10.331,10.331,0,0,1-3.964-.8A10.226,10.226,0,0,1,3.1,17.953a.175.175,0,0,1-.07-.114.188.188,0,0,1,.07-.124c.054-.053,1.451-1.55,3.07-3.283l.007-.008.012-.012c1.96-2.1,4.182-4.478,4.282-4.577a.132.132,0,0,1,.083-.045c.024,0,.038.016.038.045.053.065,7.151,7.795,7.37,7.939.033.033.046.063.037.084s-.043.035-.1.035a8.237,8.237,0,0,1-1.329,1.134,10.172,10.172,0,0,1-5.195,1.91A5.307,5.307,0,0,1,10.564,21ZM44.78,18.49H43.209c-.121,0-.121-.058-.121-.12V6.492c0-.119.059-.119.121-.119H44.9c.121,0,.121.058.121.119V7.866a3.628,3.628,0,0,1,1.631-1.433A4.192,4.192,0,0,1,50.1,6.54a4.107,4.107,0,0,1,2.176,2.639,5.245,5.245,0,0,1-.362,3.939,3.775,3.775,0,0,1-3.021,2.089,3.917,3.917,0,0,1-2.175-.238,3.809,3.809,0,0,1-1.571-1.134.311.311,0,0,1-.06-.09.311.311,0,0,0-.06-.09v4.6C45.021,18.49,45.021,18.49,44.78,18.49ZM47.715,7.663h0a2.52,2.52,0,0,0-1.727.679,2.7,2.7,0,0,0-.967,2.209,3.361,3.361,0,0,1,.121.6A2.729,2.729,0,0,0,47.8,13.536h.033a2.687,2.687,0,0,0,2.5-1.671,2.965,2.965,0,0,0,.121-1.91,2.7,2.7,0,0,0-1.752-2.089,2.52,2.52,0,0,0-.991-.2Zm-10.184,7.75a5.588,5.588,0,0,1-3.323-1.1.169.169,0,0,1-.092-.1.267.267,0,0,1,.031-.2,4.131,4.131,0,0,0,.329-.636,5.988,5.988,0,0,1,.275-.559,4.934,4.934,0,0,1,.688.28,7.085,7.085,0,0,0,.762.317,3.632,3.632,0,0,0,1.933.238,1.78,1.78,0,0,0,.6-.179.856.856,0,0,0,.48-.625.847.847,0,0,0-.239-.748,1.436,1.436,0,0,0-.664-.358,8.612,8.612,0,0,0-.973-.342c-.209-.064-.407-.125-.6-.2l-.906-.358a2.375,2.375,0,0,1,.121-4.3,5.163,5.163,0,0,1,1.911-.365c.088,0,.176,0,.264.007a6.72,6.72,0,0,1,2.6.716c.149.059.224.088.241.139s-.029.128-.12.279L40.31,8.4a.4.4,0,0,0-.033.038c-.021.027-.037.046-.069.046a.191.191,0,0,1-.08-.025,5.445,5.445,0,0,0-2.356-.716,1.6,1.6,0,0,0-.907.12.778.778,0,0,0-.543.656.68.68,0,0,0,.362.776,4.766,4.766,0,0,0,1.269.537,7.686,7.686,0,0,1,1.51.537,3.346,3.346,0,0,1,.845.537A2.278,2.278,0,0,1,41.095,13a2.382,2.382,0,0,1-1.691,2.09A5.554,5.554,0,0,1,37.531,15.413Zm-9.853-.163a3.526,3.526,0,0,1-1.384-.281,2.723,2.723,0,0,1-1.574-1.561,2.676,2.676,0,0,1,.123-2.2,2.58,2.58,0,0,1,1.692-1.254,5.573,5.573,0,0,1,1.39-.179h2.6c.072,0,.127-.022.141-.056a.058.058,0,0,0-.02-.064A2.171,2.171,0,0,0,30.583,9a1.537,1.537,0,0,0-1.329-1.134,4.126,4.126,0,0,0-2.537.3,3.425,3.425,0,0,0-.785.478.111.111,0,0,1-.075.039c-.038,0-.072-.032-.106-.1a11.187,11.187,0,0,1-.665-1.135c-.032-.032-.046-.062-.037-.083s.043-.035.1-.035a7.038,7.038,0,0,1,3.788-1.1c.207,0,.416.009.622.027a3.361,3.361,0,0,1,1.328.358,2.973,2.973,0,0,1,1.692,2.327,15.942,15.942,0,0,1,.06,1.732v4.417c0,.119-.059.119-.121.119H30.885c-.121,0-.121-.058-.121-.119v-.955a4.967,4.967,0,0,1-2.537,1.074A3.558,3.558,0,0,1,27.678,15.25Zm.428-4.041a4.134,4.134,0,0,0-1.148.179,1.006,1.006,0,0,0-.664.716,1.333,1.333,0,0,0,.966,1.552,2.775,2.775,0,0,0,2.176-.238,1.7,1.7,0,0,0,1.087-1.732,1.038,1.038,0,0,0,.06-.358c0-.119-.061-.119-.121-.119Zm41.654,4.022a5.426,5.426,0,0,1-1.843-.321,3.96,3.96,0,0,1-2.658-3.224,4.451,4.451,0,0,1,.3-2.805,4.176,4.176,0,0,1,3.262-2.506,5.9,5.9,0,0,1,2.3.059,3.357,3.357,0,0,1,2.6,2.447,6.181,6.181,0,0,1,.242,2.567c0,.12-.059.12-.121.12H70.575a19.909,19.909,0,0,0-2.717-.187c-.181,0-.364,0-.545.007a.147.147,0,0,0-.133.052.131.131,0,0,0,.013.127,2.766,2.766,0,0,0,2.7,2.089h.02l.113,0a3.371,3.371,0,0,0,2.364-.957.115.115,0,0,1,.091-.044.114.114,0,0,1,.091.044c.151.149.289.3.422.446s.273.3.424.449a.113.113,0,0,1,.044.089.116.116,0,0,1-.044.09A5.325,5.325,0,0,1,71,15.088,5.453,5.453,0,0,1,69.761,15.231ZM69.689,7.7a2.521,2.521,0,0,0-1.489.482A2.489,2.489,0,0,0,67.193,9.9c-.024.046-.03.075-.019.093s.068.026.14.026h4.832c.121,0,.121-.06.121-.119a2.824,2.824,0,0,0-.423-1.254,2.27,2.27,0,0,0-1.692-.9A2.551,2.551,0,0,0,69.689,7.7ZM56.337,15.149h-1.65c-.121,0-.121,0-.121-.12V6.433c0-.12.059-.12.121-.12h1.631c.121,0,.121.061.121.12l.06,8.536a.161.161,0,0,1-.046.133A.164.164,0,0,1,56.337,15.149Zm4.955-.119H59.641c-.121,0-.121-.058-.121-.119v-8.6c0-.119.059-.119.121-.119h1.692c.121,0,.121.058.121.119V7.745a3.407,3.407,0,0,1,.242-.3,3.308,3.308,0,0,1,2.356-1.253.53.53,0,0,0,.129-.025.62.62,0,0,1,.157-.029.184.184,0,0,1,.136.053.277.277,0,0,1,.068.268.723.723,0,0,0-.008.09V7.805c0,.12-.059.12-.121.12s-.15-.009-.225-.009a2.942,2.942,0,0,0-1.527.426,2.453,2.453,0,0,0-1.208,2.149c-.04,1-.027,1.979-.013,2.929.007.471.013.954.013,1.428a.162.162,0,0,1-.047.133A.164.164,0,0,1,61.293,15.029ZM20.555,13.357h0a.133.133,0,0,1-.121-.119c-.046-.061-9.243-10.045-9.787-10.506-.077-.076-.131-.108-.182-.108-.071,0-.135.063-.241.168C10.144,2.872.619,13.119.5,13.3a.113.113,0,0,1-.071.039.04.04,0,0,1-.036-.023.16.16,0,0,1-.014-.075A9.956,9.956,0,0,1,.016,9.955,9.438,9.438,0,0,1,1.344,5.418,10.026,10.026,0,0,1,8.232.285,10.243,10.243,0,0,1,18.079,3.21a9.9,9.9,0,0,1,2.839,5.611,8.029,8.029,0,0,1,.121,1.731,13.794,13.794,0,0,1-.423,2.686C20.616,13.3,20.616,13.357,20.555,13.357ZM55.5,4.822A1.112,1.112,0,0,1,54.71,4.5a1.094,1.094,0,0,1-.325-.813,1.2,1.2,0,0,1,1.148-1.193h.023a1.136,1.136,0,0,1,.817.347,1.112,1.112,0,0,1,.308.847,1.135,1.135,0,0,1-.336.8,1.166,1.166,0,0,1-.812.332Z"/></g></svg>`,
            type: `<svg xmlns="http://www.w3.org/2000/svg" width="59" height="20" viewBox="0 0 59 20"><defs><style>.a{fill:#fff;}</style></defs><path class="a" d="M33.979,20a13.135,13.135,0,0,1-5.435-1.092l.715-4.337a8.034,8.034,0,0,0,4.693,1.354c2.037,0,3.252-.693,3.252-1.853,0-1.1-1.177-1.751-2.539-2.5A12.021,12.021,0,0,1,31.9,9.678,4.453,4.453,0,0,1,30.544,6.4a5.7,5.7,0,0,1,.924-3.238,6.154,6.154,0,0,1,2.212-1.95A10.971,10.971,0,0,1,38.607,0a13.5,13.5,0,0,1,4.329.842l-.687,4.15a8.342,8.342,0,0,0-3.861-.911,4.682,4.682,0,0,0-2.027.378A1.353,1.353,0,0,0,35.5,5.71c0,.868,1.084,1.477,2.339,2.184,1.951,1.1,4.38,2.465,4.38,5.492a5.879,5.879,0,0,1-2.89,5.121A10.369,10.369,0,0,1,33.979,20Zm12.913-.331H41.873L49.053,1.785A2.245,2.245,0,0,1,51.276.345h3.869L59,19.667H54.579l-.565-2.87H47.9l-1,2.87ZM51.811,5.6l-2.529,7.232h3.953ZM25.577,19.668H20.763L23.772.345h4.815L25.577,19.667Zm-11.343,0H9.219L5.038,2.885c-.119-.075-.228-.142-.332-.2l-.258-.153c-.152-.088-.3-.172-.443-.249-.088-.048-.174-.093-.26-.138S3.561,2.044,3.47,2s-.164-.083-.267-.132c-.083-.041-.165-.079-.246-.117S2.784,1.668,2.7,1.63l-.231-.1c-.166-.072-.3-.131-.438-.185L1.926,1.3l-.086-.034-.228-.086-.178-.067-.2-.071L1.071.987C1.012.967.951.946.9.929L.746.881C.665.855.591.833.523.813L.481.8.388.773.293.747.195.721.161.712.132.7.063.688l-.019,0L.032.68A.288.288,0,0,1,0,.672L.089.345H7.676A2.1,2.1,0,0,1,9.96,2.085l1.62,8.689.544,2.861L16.713.345h5.181l-7.66,19.323Z"/></svg>`,
            cardHolderName: payload.cardHolderName,
            cardNumber: cardNum,
            thru: "12/22",
            cvv: Math.floor(Math.random() * (999 - 100 + 1) + 100),
            accountBalance: 3000,
            showCardNumber: false,
            isCardFreezed: false,
        };
        setCardItems([newCardObject, ...cardItems]);
        setShowForm(false);
    };

    const outSideClickHandler = (event) => {
        event.stopPropagation();
        setShowForm(false);
    };

    const handleScroll = () => {
        const cardContainer = cardContainerRef.current;
        const cardWidth = cardContainer.querySelector(
            ".card-container__card-item"
        ).offsetWidth;
        const currentCardIndex = Math.floor(
            cardContainer.scrollLeft / cardWidth
        );
        setCardItemIndex(currentCardIndex);
        const getItem = cardItems.find(
            (cardItem, index) => index === currentCardIndex
        );
        setSelectedCardItem(getItem);
    };

    useEffect(() => {
        const cardContainer = cardContainerRef.current;
        cardContainer.addEventListener("scroll", handleScroll);

        return () => {
            cardContainer.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app">
            <CardBalance
                selectedCardItem={selectedCardItem}
                addNewCardHandler={addNewCardHandler}
                showForm={showForm}
                outSideClickHandler={outSideClickHandler}
                setShowForm={setShowForm}
            />
            <TabSelection />
            <CardContainer
                ref={cardContainerRef}
                cardItems={cardItems}
                showCardNumberHandler={showCardNumberHandler}
            />
            <div className="app__state">
                {cardItems.map((cardItem, index) => {
                    return (
                        <div
                            key={cardItem.id}
                            className={classNames("app__state__item-point", {
                                "app__state__item-point--selected":
                                    cardItemIndex === index,
                            })}
                            onClick={() => {
                                moveCardItemCarousel(index, cardItem);
                            }}
                        ></div>
                    );
                })}
            </div>
            <CardSummary
                selectedCardItem={selectedCardItem}
                onActionClick={onActionClick}
                cardFeaturesData={cardFeaturesData}
            />
            <Footer />
        </div>
    );
}

export default App;
