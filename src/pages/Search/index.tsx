import { useHistory } from "react-router";
import { NavBar, SearchBar } from "antd-mobile";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useDebounceFn } from "ahooks";
import { getSuggestionAction } from "@/store/actions/search";

const SearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("");
  // 常规防抖用
  // const setIdRef = useRef(0);

  // aHooks防抖
  const { run: getSuggestion } = useDebounceFn(
    () => {
      dispatch(getSuggestionAction(value));
    },
    { wait: 800 },
  );
  const onChange = (e: string) => {
    setValue(e);
    getSuggestion();

    // 常规防抖
    // clearTimeout(setIdRef.current);
    // setIdRef.current = window.setTimeout(() => {
    //   console.log("防痘了");
    // }, 800);
  };

  // 组件销毁清除防抖
  // useEffect(() => {
  //   return () => {
  //     clearTimeout(setIdRef.current);
  //   };
  // }, []);
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={<span className="search-text">搜索</span>}
      >
        <SearchBar
          value={value}
          onChange={onChange}
          placeholder="请输入关键字搜索"
        />
      </NavBar>

      {/*{isSearching ? (*/}
      {/*  <div className={classnames("search-result", true ? "show" : "")}>*/}
      {/*    {(suggestions as Suggestion).map((item, index) => {*/}
      {/*      return (*/}
      {/*        <div*/}
      {/*          className="result-item"*/}
      {/*          key={index}*/}
      {/*          onClick={() => onSearch(item)}*/}
      {/*        >*/}
      {/*          <Icon className="icon-search" type="iconbtn_search" />*/}
      {/*          <div*/}
      {/*            className="result-value text-overflow"*/}
      {/*            dangerouslySetInnerHTML={{*/}
      {/*              __html: highlight(item),*/}
      {/*            }}*/}
      {/*          ></div>*/}
      {/*        </div>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className="history">*/}
      {/*    <div className="history-header">*/}
      {/*      <span>搜索历史</span>*/}
      {/*      <span onClick={onClearHistory}>*/}
      {/*        <Icon type="iconbtn_del" />*/}
      {/*        清除全部*/}
      {/*      </span>*/}
      {/*    </div>*/}
      {/*    <div className="history-list">*/}
      {/*      {searchHistory.map((item) => (*/}
      {/*        <span*/}
      {/*          className="history-item"*/}
      {/*          onClick={() => onClickHistory(item)}*/}
      {/*          key={item}*/}
      {/*        >*/}
      {/*          <span className="text-overflow">{item}</span>*/}
      {/*          <Icon type="iconbtn_essay_close" />*/}
      {/*        </span>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
};

export default SearchPage;
