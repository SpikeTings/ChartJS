import React from 'react';
import { connect } from 'react-redux';
import { getPost } from 'mattermost-redux/selectors/entities/posts';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,BarElement,Title } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,
  LineElement,
  BarElement,
  Title);


const charts = {
  Pie: {
    component: Pie
  },
  Line: {
    component: Line
  },
  Bar: {
    component: Bar
  }
};

const PostMessageChart = ({ chartData }) => {
  if (!chartData) {
    return null;
  }

  const { type, data } = chartData;
  const chartOptions = {
    data,
    options: {
      maintainAspectRatio: false
    }
  };
  const chart = charts[type] || charts['Bar'];
  const ChartComponent = chart.component;


  return <ChartComponent {...chartOptions} {...chart.options || {}} />;
};

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.postId.replace("user-activity-", "");
  const post = getPost(state, postId);

  try {
   
    if (post.props && post.props.chartdata) {
      return { chartData: post.props.chartdata };
    }
  } catch (e) {
  }

  return {};
};

export default connect(
  mapStateToProps,
  null
)(PostMessageChart);
