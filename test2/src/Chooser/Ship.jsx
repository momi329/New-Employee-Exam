import "./style.scss";
function Ship({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="15"
      height="13"
      viewBox="0 0 15 13"
      className={className}
    >
      <defs>
        <path
          id="g5m2lmqmoa"
          d="M14.997 9.68H1v3.52h11.48c.533 0 1.058-.018 1.899-.9l1.618-1.719c.003-.498-.445-.901-1-.901zm-.276.88l-1.105 1.172c-.52.546-.733.585-1.059.588H2v-1.76h12.721zM11.5 11c-.276 0-.5.197-.5.44s.224.44.5.44.5-.197.5-.44-.224-.44-.5-.44zm1.998-3.08c.277 0 .502.198.502.44s-.225.44-.502.44H1v-.88zm-.997-1.76c.274 0 .499.197.499.44s-.225.44-.499.44H1v-.88zm-.999-1.76c.275 0 .498.197.498.44s-.223.44-.498.44H1V4.4zM5 .88v2.64H4V.88h1zm-2.5 0v2.64h-1V.88h1zm5 0v2.64h-1V.88h1zm2.5 0v2.64H9V.88h1z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g transform="translate(-500 -299) translate(192 276) translate(18 18) translate(69) translate(209) translate(11 4.52)">
                    <use
                      fill="#222"
                      fillRule="nonzero"
                      xlinkHref="#g5m2lmqmoa"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
export default Ship;
