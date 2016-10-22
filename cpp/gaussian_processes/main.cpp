#include "gaussian_gp.hpp"
#include <iostream>
#include "matrixUtil.hpp"
#include <Eigen/Dense>

int main()
{
    Eigen::VectorXd x(5),y(5),xt(9),yt(9);
    x << 1,2,3,4,5;
    y << 0.9, 2.1, 3.1, 3.9, 10;
    std::cout << "Initializing GP" << std::endl;
    gp::GaussianGP gaussian_gp(x,y);

    xt << 1,1.5,2,2.5,3,3.5,4,4.5,5;
    std::cout << "Predicting to xt = " << std::endl;
    std::cout << xt << std::endl;
    yt = gaussian_gp.predict(xt);

    std::cout << "Predicted vector yt = " << std::endl;
    std::cout << yt << std::endl;

    return 1;
}