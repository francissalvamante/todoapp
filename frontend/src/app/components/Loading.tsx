import "./styles/Loading.css";

const Loading = (props: any) => {
  return (
    <div className="h-full flex items-center">
      <div
        className={`loader bg-green-500 ${props.loading && "visible"}`}
      ></div>
    </div>
  );
};

export default Loading;
