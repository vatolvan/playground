#include "squared_exp.hpp"
#include <cmath>
#include <iostream>

namespace gp {
namespace covf {

SquaredExp::SquaredExp(const Eigen::VectorXd &data) : 
    lengthScale(1.0),
    magnSigma2(1.0)
{
    cov = computeCovariance(data,data);
}

Eigen::MatrixXd SquaredExp::computeCovariance(const Eigen::VectorXd &data1, const Eigen::VectorXd &data2)
{
    Eigen::MatrixXd covariance(data1.size(), data2.size());
    for (int i = 0; i < data1.size(); i++) {
        for (int j = 0; j < data2.size(); j++) {
            covariance(i,j) = exp(-pow(data1[i]-data2[j],2)/(2*lengthScale*lengthScale));
        }
    }
    return covariance;
}

Eigen::MatrixXd SquaredExp::getCovariance() 
{
    return cov;
}

}
}