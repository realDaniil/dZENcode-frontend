export default function Loader({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center top-0 start-0 bottom-0 end-0"
      style={{ marginTop: 200, ...style }}
    >
      <div className="spinner-border text-success" role="status"></div>
    </div>
  );
}
