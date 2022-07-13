const Results = (props) => {
  return (
    <div className='container'>
      {/* <div className='headingoutome'>Results</div> */}
      <div className='row'>
        <div className='resultcontainer'>
          <div className='col-sm'>
            {/* <div className='headingoutome'>Correct Cities</div> */}
            {props.citiesCorrect.map((item) => {
              return (
                <div className='cardBody' key={item}>
                  {item}
                </div>
              );
            })}
          </div>
          <div className='col-sm'>
            {props.citiesWrong.map((item) => {
              return (
                <div key={item} className='cardBody'>
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Results;
