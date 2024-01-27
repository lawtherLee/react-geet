import styles from "./index.module.scss";

type Props = {
  onClose: () => void;
  type: "" | "gender" | "photo";
  onUpdate: (type: "" | "gender" | "photo", value: string) => void;
};

const EditList = ({ onClose, type, onUpdate }: Props) => {
  const genderList = [
    { title: "男", value: "1" },
    { title: "女", value: "0" },
  ];

  const photoList = [
    { title: "拍照", value: "" },
    { title: "本地选择", value: "" },
  ];

  const list = type === "gender" ? genderList : photoList;
  return (
    <div className={styles.root}>
      {list.map((item) => {
        return (
          <div
            onClick={() => onUpdate(type, item.value)}
            className={"list-item"}
            key={item.title}
          >
            {item.title}
          </div>
        );
      })}

      <div onClick={onClose} className="list-item">
        取消
      </div>
    </div>
  );
};

export default EditList;
