#ifndef GAUSSIAN_GP_H
#define GAUSSIAN_GP_H

#include "squared_exp.hpp"
#include <vector>
#include <Eigen/Dense>

namespace gp {

class GaussianGP {
public:

    /**
     * Constructor.
     */
    GaussianGP(Eigen::VectorXd &x, Eigen::VectorXd &y);


    /**
     *
     */
    Eigen::VectorXd predict(Eigen::VectorXd &xt);

private:
    gp::covf::SquaredExp covarianceFunction;

    Eigen::VectorXd x;
    Eigen::VectorXd y;

    double noiseSigma2;

};

} // namespace gp


#endif /* GAUSSIAN_GP_H */

