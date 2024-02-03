import { useHistory } from "react-router";
import { NavBar, SearchBar, Toast } from "antd-mobile";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useDebounceFn } from "ahooks";
import { getSuggestionAction, saveHistory } from "@/store/actions/search";
import { RootState } from "@/types/store";
import { Suggestion } from "@/types/data";
import Icon from "@/components/Icon";
import classnames from "classnames";

const SearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("");
  const { suggestions, history: searchHistory } = useSelector(
    (state: RootState) => state.search,
  );
  const [isSearching, setIsSearching] = useState(false);

  // 常规防抖用
  // const setIdRef = useRef(0);

  // aHooks防抖
  const { run: getSuggestion } = useDebounceFn(
    () => {
      dispatch(getSuggestionAction(value));
    },
    { wait: 800 },
  );

  // 输入框变化
  const onChange = (e: string) => {
    setValue(e);
    if (e) {
      getSuggestion();
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

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

  // 处理高亮
  const highLight = (text: string) => {
    return text.replace(
      new RegExp(value, "gi"),
      (match) => `<span>${match}</span>`,
    );
  };

  // 点击搜索
  const onSearch = (value: string) => {
    if (value.trim() === "") return Toast.show({ content: "请输入搜索关键字" });
    dispatch(saveHistory(value));
  };

  // 点击搜索历史
  const onClickHistory = (value: string) => {
    onSearch(value);
  };
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => history.go(-1)}
        right={
          <span className="search-text" onClick={() => onSearch(value)}>
            搜索
          </span>
        }
      >
        <SearchBar
          value={value}
          onChange={onChange}
          placeholder="请输入关键字搜索"
        />
      </NavBar>

      {isSearching ? (
        <div className={classnames("search-result", true ? "show" : "")}>
          {(suggestions as Suggestion).map((item, index) => {
            return (
              <div
                className="result-item"
                key={index}
                onClick={() => onSearch(item)}
              >
                <Icon className="icon-search" type="iconbtn_search" />
                <div
                  className="result-value text-overflow"
                  dangerouslySetInnerHTML={{
                    __html: highLight(item),
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="history">
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>
          <div className="history-list">
            {searchHistory.map((item) => (
              <span
                className="history-item"
                key={item}
                onClick={() => onClickHistory(item)}
              >
                <span className="text-overflow">{item}</span>
                <Icon type="iconbtn_essay_close" />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
