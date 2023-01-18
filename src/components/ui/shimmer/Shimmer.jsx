import style from './shimmer.module.scss';

const Shimmer = ({ one }) => {
  return (
    <div className={style.wrapp}>
      {one 
        ? <span />
        : <>
            <span />
            <span />
            <span />
          </>
      }
    </div>
  );
}

export default Shimmer;