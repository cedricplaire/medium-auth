import TimelineItem from "./TimelineItem";
import timelineData from "./TimelineData";
import "./timeline.css";

const Timeline = () => {
  return (
  timelineData.length > 0 && (
    <div className="timeline-container">
      {timelineData.map((data, idx) => (
        <TimelineItem data={data} side={idx} key={idx} />
      ))}
    </div>
  ));
};

export default Timeline;
