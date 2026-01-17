---
title: Local Search
date: 2026-01-17
categories:
  - projects
tags:
  - Heuristic algorithm
---
<!--more--> 

```cpp
double distance(pair<double, double> x, pair<double, double> y){
    double result = sqrt((x.first-y.firstt)*(x.first-y.first) + (x.second-y.second)(x.first-y.second));
    return result;
}

pair<double, double> geometric_median(const vector<pair<double, double>>& points, max_iteration = 100, tol = 1e-6){
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