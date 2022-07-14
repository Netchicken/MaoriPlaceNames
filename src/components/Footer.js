const Footer = ({ props }) => {
  return (
    <div className='fixed-bottom border bg-light border-success'>
      <div className='row'>
        <div className='col-sm'>
          <div className='appheadercitytext'>
            <b> Hint: {props.Components ? props.Components : ""}</b>
          </div>
        </div>
        <div className='col-sm '>
          <div className='appheadercitytext'>
            The Place is {props.Placename ? props.Placename : ""} (debugging)
          </div>
        </div>
        <div className='col-sm'>
          <a
            className='appheadercitytext'
            href='https://nzhistory.govt.nz/culture/maori-language-week/1000-maori-place-names'
          >
            1000 Maori Place Names
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
