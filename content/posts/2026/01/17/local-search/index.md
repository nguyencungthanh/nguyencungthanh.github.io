---
title: Local Search
date: 2026-01-17
categories:
  - projects
tags:
  - Heuristic algorithm
---

Given $n$ points in the plane. We want to find a point that minimizes the sum of distance between this point and all the given $n$ points. One of the easiest but efficient way to approach this problem is using **Local Search**.   

<!--more--> 

Local search is a heuristic method for solving computationally hard optimization problems. The main ideas of local search can be expressed as follow: 
1. Initialize an arbitrary configuration
2. Consider any configuration that adjacents to present configuration and update to the best configuration 
3. Iterate until fixed iteration or meet some conditions 

Back to the initial problem. We can express it as follow: 

<div style="border: 2px solid #ccc; border-radius: 4px; padding: 5px; background-color:rgba(245, 245, 248, 0.64);">
Find $(x, y)$ that minizes 
$$f(x, y) = \sum_{i = 1}^{n} \sqrt{(x-x_i)^2 + (y-y_i)^2}$$ 
</div>

Taking the partial derivative of $f$ with respect to $x$ and $y$ yields: 
$$\begin{cases}
\dfrac{\partial f}{\partial x} = \sum_{i=1}^{n} \dfrac{x-x_i}{\sqrt{(x-x_i)^2 + (y-y_i)^2}} \\\\
\dfrac{\partial f}{\partial y} = \sum_{i=1}^{n} \dfrac{y-y_i}{\sqrt{(x-x_i)^2 + (y-y_i)^2}}
\end{cases}$$

Set them equal to $0$ we will have 
$$x = \sum_{i=1}^{n} \dfrac{x_i}{\sqrt{(x-x_i)^2 + (y-y_i)^2}} \quad \text{ and } \quad y = \sum_{i=1}^{n} \dfrac{y_i}{\sqrt{(x-x_i)^2 + (y-y_i)^2}}$$

This give our idea of update the next point $(z_{k+1}, w_{k+1})$ equal to $$\left( \dfrac{x_i}{\sqrt{(z_k-x_i)^2 + (w_k-y_i)^2}}, \dfrac{y_i}{\sqrt{(z_k-x_i)^2 + (w_k-y_i)^2}} \right)$$

Following that ideas, we can iterate 100 times and the condition to stop is the distance between the previous point and the new point is less than $10^{-6}$. The below C++ code is the example implementation code for that idea. 

```cpp
double distance(pair<double, double> x, pair<double, double> y){
    double result = sqrt((x.first-y.firstt)*(x.first-y.first) + (x.second-y.second)(x.first-y.second));
    return result;
}

pair<double, double> geometric_median(const vector<pair<double, double>>& points, int max_iteration = 100, double tol = 1e-6){
    int n = points.size();
    double sum_x, sum_y;

    // Find the centroid of n points and assign the initial point to the centroid
    for(int i = 0; i < n; ++i){
        sum_x += points[0].first;
        sum_y += points[0].second;
    }
    pair<double, double> centroid = {(double) sum_x/n, (double) sum_y/n}; 
    pair<double, double> cur_point = centroid;

    // lists store the distance and weight between current point and n points
    vector<double> distances(n, 0.0);
    vector<double> weights(n, 0.0);

    while(max_iteration-- > 0){
        for(int i = 0; i < n; ++i){
            distances[i] = distance(cur_point, points[i]);
        }

        for(int i = 0; i < n; ++i){
            weights[i] = 1.0/distances[i];
        }

        // Compute new point by the formular: x = (sum w_i*x_i)/(sum w_i), y = (sum w_i*y_i)/(sum w_i)
        double numerator_x = 0.0, numerator_y = 0.0, denominator = 0.0;
        for(int i = 0; i < n; ++i){
            numerator_x += weights[i]*points[i].first;
            numerator_y += weights[i]*points[i].second;
            denominator += weights[i];
        }
        pair<double, double> new_point = {numerator_x/denominator, numerator_y/denominator};

        // Comput the distance between new point and current point; if the result is smaller than tolerence
        // then stop the iteration
        double shift = distance(new_point, cur_point);
        if(shift < tol) break;
        cur_point = new_point; 
    }

    return cur_point;
}
```