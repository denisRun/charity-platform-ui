import { FC } from "react";
import { useTranslation } from "react-i18next";

interface MetricProps{
    label: string;
    value: number;
    percents: number;
    isPercentsRevesred: boolean;
}

const Metric: FC<MetricProps> = (props) => {

    const { t } = useTranslation();
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
                    {props.percents != 0 ? 
                        <p className="mb-0" style={{color : isPersentsPositive ? props.isPercentsRevesred ? "orange" : "green" : props.isPercentsRevesred ? "green" : "orange"}}>
                            {isPersentsPositive ? "+" : ""}{props.percents}%
                        </p> :
                        <p className="mb-0">
                            {"+"}{props.percents}%
                        </p> }
                    <p className="mb-0 mt-0" style={{fontSize:"10px", color:"gray"}}>
                        {t('vs Previous 28 Days')}
                    </p>
                </div>
            </div>
        </div>
  )};

export default Metric;