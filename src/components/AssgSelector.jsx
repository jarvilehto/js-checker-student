
const AssgSelector = (props) => (
  <div style={{backgroundColor:'red', flex:1, flexDirection:'row', width:'200px'}}>
    <select onChange={(event) => props.onAssgSelect(event.target.value)}>
      <option value="">Choose task</option>
      {props.assgs.map((assg, index) => (
        <option key={index} value={assg.name}>
          {assg.name}
        </option>
      ))}
    </select>
    <button onClick={props.onEvaluate}>Eval</button>
    <input name="Assignment URL" onChange={(event) => props.onUrlChange(event.target.value)}/>
  </div>
);

export default AssgSelector;
