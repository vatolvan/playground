#include "gaussian_gp.hpp"
#include <iostream>
#include <assert.h>
#include "matrixUtil.hpp"
#include "Eigen/Dense"

namespace gp {

GaussianGP::GaussianGP(Eigen::VectorXd &x, Eigen::VectorXd &y) :
    covarianceFunction(x),
    x(x),
    y(y),
    noiseSigma2(0.1)
{
}

Eigen::VectorXd GaussianGP::predict(Eigen::VectorXd &xt)
{
    Eigen::MatrixXd K = covarianceFunction.getCovariance();
    Eigen::MatrixXd Kstar = covarianceFunction.computeCovariance(xt,x);

    std::cout << "Size of K = " << K.rows() << ", " << K.cols() << std::endl;
    std::cout << "Size of Kstar = " << Kstar.rows() << ", " << Kstar.cols() << std::endl;
    std::cout << "Size of y = " << y.rows() << ", " << y.cols() << std::endl;

    Eigen::MatrixXd C = K + noiseSigma2*Eigen::MatrixXd::Identity(x.size(), x.size());
    Eigen::LDLT<Eigen::MatrixXd> Kdecomp = C.ldlt();


    const size_t nt = xt.size();
    Eigen::VectorXd yt(nt);
    // Solve Ktmp = inv(K)*y
    Eigen::MatrixXd Ktmp = Kdecomp.solve(y);
    // Predicted yt = K(xt, x) * inv(K(x,x)) * y
    yt = Kstar*Ktmp;

    return yt;
}


}