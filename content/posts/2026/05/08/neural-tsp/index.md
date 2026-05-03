---
title: Neural Travelling Sales Man
date: 2026-05-08
categories:
  - projects 
tags:
  - Reinforcement Learning 
draft: True
---

Given $n$ points in the plane. We want to find a point that minimizes the sum of distance between this point and all of the given points. One of the easiest but efficient way to approach this problem is using `Local Search`.   
<!--more--> 

Local search is a heuristic method for solving computationally hard optimization problems. Indeed, sometimes we tackle an optimization problem that we cannot find the exactly minimization argument, local search is created to find a 'good enough' solution for the problem. The main ideas of algorithm can be expressed as follow: 
1. Initialize an arbitrary configuration
2. Consider any configuration that adjacents to present configuration and update to the best configuration 
3. Iterate until fixed number of iteration or meet some conditions 

Back to the initial problem, we can express it as follow: 

<div style="border: 2px solid #ccccccbc; border-radius: 5px; padding: 1px; background-color:rgba(35, 117, 224, 0.12);">
Given $n$ points $(x_i,y_i)$ on the plane. Find a point $(x, y)$ that minizes 
$$f(x, y) = \sum_{i = 1}^{n} \sqrt{(x-x_i)^2 + (y-y_i)^2}$$ 
</div>


Taking the partial derivative of $f$ with respect to $x$ and $y$ yields: 
$$\begin{cases}
\dfrac{\partial f}{\partial x} = \sum_{i=1}^{n} \dfrac{x-x_i}{\sqrt{(x-x_i)^2 + (y-y_i)^2}} \\\\
\dfrac{\partial f}{\partial y} = \sum_{i=1}^{n} \dfrac{y-y_i}{\sqrt{(x-x_i)^2 + (y-y_i)^2}}
\end{cases}$$

Set them equal to $0$ we will have 
$$x = \dfrac{\sum_{i=1}^{n} w_ix_i}{\sum_{i=1}^n w_i} \quad \text{ and } \quad y = \dfrac{ \sum_{i=1}^{n} w_iy_i}{\sum_{i=1}^n w_i}$$
where $$w_i =  \dfrac{1}{\sqrt{(x-x_i)^2 + (y-y_i)^2}} \quad \forall i = \overline{1,n}$$

This give our idea of update from the k-iteration point $(z_k,w_k)$ to the next point $(z_{k+1}, w_{k+1})$ equal to $$\left(\dfrac{\sum_{i=1}^{n} w_{i,k}x_i}{\sum_{i=1}^n w_{i,k}}, \dfrac{\sum_{i=1}^{n} w_{i,k}x_i}{\sum_{i=1}^n w_{i,k}} \right)$$
with $$w_{i,k} =  \dfrac{1}{\sqrt{(z_k-x_i)^2 + (w_k-y_i)^2}} \quad \forall i = \overline{1,n}$$
Following that idea, we can iterate 100 times and the condition to stop is the distance between the previous point and the new point is less than $10^{-6}$. The below C++ code is the example implementation code for that idea. 

```cpp
long double  distance(const pair<long double, long double>& x, const pair<long double, long double>& y){
    long double  result = sqrt((x.first-y.first)*(x.first-y.first) + (x.second-y.second)*(x.second-y.second));
    return result;
}

pair<long double, long double> geometric_median(const vector<pair<long double, long double>>& points, int max_iteration = 100, long double tol = 1e-6){
    int n = points.size();
    long double sum_x = 0.0;
	long double sum_y = 0.0;

    // Find the centroid of n points and assign the initial point to the centroid
    for(int i = 0; i < n; ++i){
        sum_x += points[i].first;
        sum_y += points[i].second;
    }
    pair<long double , long double > centroid = {sum_x/n, sum_y/n}; 
    pair<long double , long double > cur_point = centroid;

    // lists store the distance and weight between current point and n points
    vector<long double > distances(n);
    vector<long double > weights(n);

    while(max_iteration-- > 0){
        bool coincides = false;
        int coincide_idx = -1;
        for (int i = 0; i < n; ++i) {
            distances[i] = distance(cur_point, points[i]);
            if (distances[i] == 0.0) { 
                coincides = true;
                coincide_idx = i;
                break;
            }
        }

        if (coincides) {
            return points[coincide_idx];
        }

        for(int i = 0; i < n; ++i){
            weights[i] = 1.0/distances[i];
        }

        // Compute new point by the formular: x = (sum w_i*x_i)/(sum w_i), y = (sum w_i*y_i)/(sum w_i)
        long double  numerator_x = 0.0, numerator_y = 0.0, denominator = 0.0;
        for(int i = 0; i < n; ++i){
            numerator_x += weights[i]*points[i].first;
            numerator_y += weights[i]*points[i].second;
            denominator += weights[i];
        }
        pair<long double , long double> new_point = {numerator_x/denominator, numerator_y/denominator};

        // Compute the distance between new point and current point; if the result is smaller than tolerence then stop the iteration
        long double  shift = distance(new_point, cur_point);
        if(shift < tol) break;
        cur_point = new_point; 
    }

    return cur_point;
}

int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);

	int n; cin >> n;
    vector<pair<long double,long double>> pts(n);
	for(int i = 0; i < n; ++i){
		long double x, y;
		cin >> x >> y;
		pts[i] = {x, y};
	}
	auto opt = geometric_median(pts);
	cout << fixed << setprecision(6) << "Optimal solution" << "(" << opt.first <<", " << opt.second << ")";
    return 0;
}
```