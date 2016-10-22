#ifndef COVF_SQUARED_EXP_H
#define COVF_SQUARED_EXP_H

#include <vector>
#include <Eigen/Dense>

namespace gp {
namespace covf {

class SquaredExp {
public:
    EIGEN_MAKE_ALIGNED_OPERATOR_NEW

    /**
     * Constructor.
     */
    SquaredExp(const Eigen::VectorXd &data);

    /**
     *
     */
    Eigen::MatrixXd computeCovariance(const Eigen::VectorXd &data1, const Eigen::VectorXd &data2);

    /**
     *
     */
    Eigen::MatrixXd getCovariance();

private:

    double lengthScale;
    double magnSigma2;

    Eigen::MatrixXd cov;

};

} // namespace covf
} // namespace gp

#endif /* COVF_SQUARED_EXP_H */

