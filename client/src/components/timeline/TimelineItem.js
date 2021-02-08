import React from 'react';
import moment from "moment";
import { Popover, OverlayTrigger } from 'react-bootstrap';

const renderTooltip = (props) => {
    const { date } = props;
    const { url } = props.link;
    return (
        <Popover id='timeline-popover'>
          <Popover.Title as="h4" className="tl-popover-title">
              {moment(date).format('dddd DD MMMM YYYY HH:mm')}
          </Popover.Title>
          <Popover.Content className="tl-popover-content">
            {url}
          </Popover.Content>
        </Popover>
    )
};

const TimelineItem = ({ data, side }) => {
  return (
    <div className="timeline-item">
        <div className="timeline-item-content">
            <span className="tag" style={{ background: data.category.color }}>
                {data.category.tag}
            </span>
            <time>{data.date}</time>
            <p>{data.text}</p>
            {data.link && (
                <a
                    href={data.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {data.link.text}
                </a>
            )}
            <OverlayTrigger
                placement={side%2 !== 0 ? "right" : "left"}
                delay={{ show: 150, hide: 300 }}
                overlay={renderTooltip(data)}
            >
                <span className="circle" />
            </OverlayTrigger>
        </div>
    </div>
  );
};

export default TimelineItem;