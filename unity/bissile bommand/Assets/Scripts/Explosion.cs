using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Explosion : MonoBehaviour
{
    private SphereCollider _collider;
    private float _startTime;

    // Start is called before the first frame update
    void Start()
    {
        _collider = GetComponent<SphereCollider>();
        _startTime = Time.time;
    }

    // Update is called once per frame
    void Update()
    {
        SetExplosionRadius();

        if (Lifetime() > 1)
        {
            Destroy(gameObject);
        }
    }

    private float Lifetime()
    {
        return Time.time - _startTime;
    }

    private void SetExplosionRadius()
    {
        const float explosionSpeed = 2f;
        if (Lifetime() > 0.6)
        {
            _collider.radius = 0;
        }
        else
        {
            _collider.radius = Lifetime() * explosionSpeed;
        }
    }
}
