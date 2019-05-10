import React, {Component} from 'react'


class PrintThisComponent extends Component {

  componentDidMount() {

    console.log('PrintThisComponent mounted!')

  }

  render() {

    return (
      <div>

        <button onClick={() => window.print()}>PRINT CALENDAR</button>

        <p></p>

      </div>

    )
  }
}

export default PrintThisComponent