import ReactSpeedometer from "react-d3-speedometer"
export default function Riskometer() {
  return (
    <div>
        <ReactSpeedometer
  maxValue={100}
  value={3}
  
  startColor="green"
  segments={3}
  endColor="#B30000"
  segmentColors={[
    
    "green", 
    "orange",
    "red",
    
  ]}
  customSegmentStops={[0, 30, 70, 100]}
  customSegmentLabels={[
      {
        text: "UNDER BOUGHT",
        position: "INSIDE",
        color: "#FFFF",
        fontSize: "8px",
      },
      {
        text: "NEUTRAL",
        position: "INSIDE",
        color: "#FFFF",
        fontSize: "10px",
      },
      {
        text: "OVERBOUGHT",
        position: "INSIDE",
        color: "#FFFF",
        fontSize: "8px",
      }]}
/>
    </div>
  )
}
