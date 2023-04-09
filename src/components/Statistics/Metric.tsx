import { FC } from "react";

interface MetricProps{
    label: string;
    value: number;
    percents: number;
}

const Metric: FC<MetricProps> = (props) => {

    const isPersentsPositive = props.percents >= 0 ? true : false;

    return (
        <div className="border border-2 rounded" style={{width:"330px"}}>
            <div className="row mt-3 ms-2 me-2 mb-0">
                    <h6 className="fw-bold">
                        {props.label}
                    </h6>
            </div>
            <div className="row ms-2 me-2 mb-0">
                <div className="col-6">
                    <h3>
                        {props.value}
                    </h3>
                </div>
                <div className="col-6 text-end">
                    <p className="mb-0" style={{color : isPersentsPositive ? "green" : "orange"}}>
                        {isPersentsPositive ? "+" : ""}{props.percents}%
                    </p>
                    <p className="mb-0 mt-0" style={{fontSize:"10px", color:"gray"}}>
                        vs Previous 28 Days
                    </p>
                </div>
            </div>
        </div>
  )};

export default Metric;