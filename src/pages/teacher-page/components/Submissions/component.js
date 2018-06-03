import React from 'react';

class Submissions extends React.Component {
  render() {
    const question =
      'Bacon ipsum dolor amet pancetta frankfurter shankle pork chop t-bone hamburger venison turducken andouille bacon sirloin ground round. Beef ribs tri-tip tenderloin bacon shankle biltong pastrami swine leberkas burgdoggen chuck brisket picanha chicken. Picanha venison biltong turkey, capicola spare ribs shank doner meatloaf.'; // this.props.question;
    const questionNumber = 1;

    // TODO: Replace with submissions component
    let submissions = ['blue', 'purple', 'polynomial'];
    submissions = submissions.map((el, i) => {
      // TODO: Perhaps turn the submission element below into a separate component if needed?
      return (
        <div className="submission">
          <img
            className="icon"
            src="https://png.icons8.com/color/1600/person-male.png"
          />
          <div className="answer">
            Chicken kielbasa corned beef meatloaf meatball, chuck frankfurter
            turkey short loin. Rump meatloaf corned beef beef ribs meatball cow
            ball tip pork belly frankfurter. Jerky tongue tail jowl beef,
            shankle ham swine chuck pork loin.
          </div>
        </div>
      );
    });

    return (
      <div className="submissions-page">
        <div className="question">
          <h3>{questionNumber}</h3>
          <p>{question}</p>
        </div>
        <div className="submissions">
          <h3>Answers</h3>
          <div className="entries">{submissions}</div>
        </div>
      </div>
    );
  }
}
