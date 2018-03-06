import * as React from 'react';
import { Link } from 'react-router';

import { TAGS } from '../../constants/constValues';

import '../../styles/nav.scss';

class Nav extends React.Component<{ current: string }, { current: number }> {
  constructor(props) {
    super(props);

    // 设置当前 tab
    this.state = {
      current: TAGS.filter(tag => tag.isTab).map(tab => {
        return tab.name;
      }).indexOf(this.props.current)
    };
  }

  handleClick(index) {
    this.setState({ current: index });
  }

  render() {
    return (
      <nav className="nav">
        {TAGS.filter(tab => tab.isTab).map((tab, index) => {
          return (
            <Link
              to={`/topics/${tab.name}`}
              onClick={() => this.handleClick(index)}
              className={`nav-item ${this.state.current === index ? 'current' : ''}`}
              key={index}
            >
              {tab.text}
            </Link>
          )
        })}
      </nav>
    )
  }
}

export default Nav;